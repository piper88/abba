'use strict';

require('./_profile.scss');


module.exports = ['$log', '$q', '$http', 'profileService', 'residenceService', ProfileController ];

function ProfileController($log, $q, $http, profileService, residenceService){
  $log.debug('init LoginController');

  this.residences = [];

  this.fetchResidences = function(){
    residenceService.fetchResidences()
    .then( residences => {
      this.residences = residences;
      this.currentResidence = residences[0];
    });
  };

  this.fetchProfile = function() {
    profileService.fetchProfile()
    .then((profile) => {
      this.profile = profile;
    })
    .catch((err) => {
      $log.error(err, err.message);
      return $q.reject(err);
    });
  };

  this.fetchProfile();
}
