'use strict';

require('./_login.scss');

module.exports = ['$log', '$rootScope', '$location', 'authService',  LoginController ];

function LoginController($log, $rootScope, $location, authService){
  $log.debug('init LoginController');

  let query = $location.search();
  console.log('query', query.token);

  this.showSignin = true;

  if(query.token){
    authService.setToken(query.token)
    .then(() => {
      $location.path('/profile');
    });
  }

  let googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth';
  let googleAuthResponseType = 'response_type=code';
  let googleAuthClientID = `client_id=${__GOOGLE_CLIENT_ID__}`;
  let googleAuthScope = 'scope=profile%20email%20openid';
  let googleAuthRedirectURI = `redirect_uri=${__API_URL__}/api/auth/oauth_abba_callback`;
  let googleAuthAccessType = 'access_type=offline';
  let googleAuthPrompt = 'prompt=consent';
  this.googleAuthURL = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectURI}&${googleAuthAccessType}&${googleAuthPrompt}`;
}
