'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const googleOAUTH = require('../lib/google-oauth-middleware.js');
const debug = require('debug')('abba:auth-router');
const basicAuth = require('../lib/basic-auth-middleware.js');

const User = require('../model/user.js');

const authRouter = module.exports = Router();

authRouter.post('/api/signup', jsonParser, function(req, res, next){
  debug('POST /api/signup');

  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);

  user.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next);
});

authRouter.get('/api/login', basicAuth, function(req, res, next){
  debug('GET /api/login');
  User.findOne({email: req.auth.email})
  .catch(err => Promise.reject(createError(401, err.message)))
  .then(user => user.comparePasswordHash(req.auth.password))
  .catch(err => Promise.reject(createError(401, err.message)))
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next);
});

authRouter.get('/api/auth/oauth_abba_callback', googleOAUTH, function(req, res) {
  debug('GET /api/oauth/oauth_abba_callback');
  if(req.googleError) {
    console.log('req.googleError', req.googleError);
    return res.redirect('/#/login');
  }

  //check if user already exists
  User.findOne({email: req.googleOAUTH.email})
  .then(user => {
    if(!user) return Promise.reject(new Error('user not found'));
    return user;
  })
  .catch( err => {
    console.log('------', err.message);
    if(err.message === 'user not found') {
      let userData = {
        username: req.googleOAUTH.email,
        email: req.googleOAUTH.email,
        google :{
          googleID: req.googleOAUTH.googleID,
          tokenTTL: req.googleOAUTH.tokenTTL,
          tokenTimestamp: Date.now(),
          refreshToken: req.googleOAUTH.refreshToken,
          accessToken: req.googleOAUTH.accessToken,
        },
      };
      console.log('userData', userData);
      return new User(userData).save();
    }
    return Promise.reject(err);
  })
  .then(user => {
    console.log('badfogkljsadfkjasdfilua;dsfsadfasdfasdf', user);
    return user.generateToken();
  })
  .then(token => {
    res.redirect(`/#/login/?token=${token}`);
    console.log('token ------>' , token);
    //res.redirect('/#/profile');
    return token;
  })
  .catch(err => {
    console.log('error token',err.message);
    res.redirect('/#/login');
  });
});
