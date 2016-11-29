'use strict';

// npm
const multer = require('multer');
const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('abba:photo-route');
const upload = multer({dest: `${__dirname}/../data`});

// app
const Profile = require('../model/profile.js');
const Bedroom = require('../model/bedroom.js');
const photoMiddleware = require('../lib/photo-aws-middleware.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

// constants
const photoRouter = module.exports = Router();

photoRouter.post('/api/profile/:profID/photo', jsonParser, bearerAuth, upload.single('file'), photoMiddleware.profilePhotoUpload, function(req, res, next) {
  debug('POST /api/profile/:profID/photo');
  Profile.findById(req.params.profID)
  .then(profile => {
    if(profile.userID.toString() !== req.user._id.toString())
      return next(createError(401, 'invalid userID'));
    Profile.findByIdAndAddPhoto(req.params.profID, res.photo)
    .then(() => res.json(res.photo));
  });
});

photoRouter.delete('/api/profile/:profID/photo/:id', bearerAuth, photoMiddleware.photoDelete, function(req, res, next) {
  debug('DELETE /api/profile/:profID/photo/:id');
  Profile.findByIdAndRemovePhoto(req.params.profID, req.photo)
  .then(() => res.sendStatus(204))
  .catch(err => next(createError(404, err.message)));
});

photoRouter.post('/api/bedroom/:bedroomID/photo', bearerAuth, upload.single('file'), photoMiddleware.bedroomPhotoUpload, function(req, res) {
  debug('POST /api/bedroom/:bedroomID/photo');
  res.json(req.photoData);
});

photoRouter.delete('/api/bedroom/:bedroomID/photo/:id', bearerAuth, photoMiddleware.photoDelete, function(req, res, next) {
  debug('DELETE /api/bedroom/:bedroomID/photo/:id');
  Bedroom.findByIdAndRemovePhoto(req.params.bedroomID, req.photo)
  .then(() => res.sendStatus(204))
  .catch(err => next(createError(404, err.message)));
});
