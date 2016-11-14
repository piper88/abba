'use strict';

const request = require('superagent');
const debug = require('debug')('abba:google-oauth-middleware');

module.exports = function(req, res, next){
  debug('getting google user info');
  //if user clicks deny, will throw error
  if (req.query.error){
    req.googleError = new Error(req.query.error);
    return next();
  }

  //if the user clicks allow, save the 'code' that was sent to our server, that we will then need to send back to the google oauth api, along with the client id, client secret, and the redirect uri, where all this information (aka oauth server response) should be sent. The oauth api will finally then send us the refresh and access tokens
  let data = {
    //req is the client's request to the google oauth api?
    code: req.query.code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    //the uri determines where the oauth server response will be sent to (must match the value listed on the developers console)
    //we give it to the code, client_id, etc., and we say, once you have a response to send back to us, send it to this uri
    redirect_uri: `${process.env.API_URL}/api/auth/oauth_callback`,
    grant_type: 'authorization_code',
  };

  let accessToken, refreshToken, tokenTTL;
  //then we actually make the post request to the oauth people
  request.post('https://www.googleapis.com/oauth2/v4/token')
  .type('form')
  .send(data)
  //then the oauth will send a response back, of the tokens and what not, and then with this information we immediately make a request to OpenID to get more details about that person
  .then(response => {
    accessToken = response.body.access_token;
    refreshToken = response.body.refresh_token;
    tokenTTL = response.body.expires_in; // how long the accessToken token will work in seconds
    return request.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
    .set('Authorization', `Bearer ${response.body.access_token}`);
  })
  //then, we save the tokens in the req.googleOAUTH object, that we will use in auth-router
  .then(response => {
    debug('google-oauth-middleware response after openID request', response.body);
    req.googleOAUTH = {
      googleID: response.body.sub,
      email: response.body.email,
      accessToken,
      refreshToken,
      tokenTTL,
    };
    next();
  })
  .catch((err) => {
    req.googleError = err;
    next();
  });
};
