'use strict';

require('./_residence.scss');

module.exports = ['$log', '$window', '$rootScope', '$location', 'authService', 'residenceService', ResidenceController];

function ResidenceController($log, $window, $rootScope, $location, authService, residenceService){
  $log.debug('init homeCtrl');

  this.today = new Date();

  this.residences = [];

  this.fetchResidences = function(){
    residenceService.fetchResidences()
   .then( residences => {
     this.residences = residences;
     this.currentGallery = residences[0];
   });
  };

  this.residenceDeleteDone = function(residence){
    $log.debug('residenceCtrl.residenceDeleteDone()');
    if (this.currentResidence._id === residence._id){
      this.currentResidence = null;
    }
  };

  this.fetchResidences();

  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchResidences();
  });

  let query = $location.search();
  if (query.token){
    authService.setToken(query.token)
    .then(() => {
      $location.path('/#/profile');
    });
  }

  $window.onload = function() {
    authService.getToken()
    .then( token => {
      console.log('token', token);
      $location.url('/profile');
    })
    .catch( () => {
      let query = $location.search();
      if (query.token){
        authService.setToken(query.token)
        .then(() => {
          $location.path('/#/profile');
        });
      }
    });
  };

  $rootScope.$on('locationChangeSuccess', $window.onload);

  let googleAuthBase = 'https://accounts.google.com/o/oauth2/v2/auth';
  let googleAuthResponseType = 'response_type=code';
  let googleAuthClientID = `client_id=${__GOOGLE_CLIENT_ID__}`;
  let googleAuthScope = 'scope=profile%20email%20openid';
  let googleAuthRedirectUri = 'redirect_uri=http://localhost:3000/api/auth/oauth_callback';
  let googleAuthAccessType = 'access_type=offline';


  this.googleAuthUrl = `${googleAuthBase}?${googleAuthResponseType}&${googleAuthClientID}&${googleAuthScope}&${googleAuthRedirectUri}&${googleAuthAccessType}`;
}
