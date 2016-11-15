'use strict';

require('./_profile.scss');


module.exports = ['$log', '$q', '$http', 'profileService', ProfileController ];

function ProfileController($log, $q, $http, profileService){
  $log.debug('init LoginßController');

  this.fetchProfile = function() {
    profileService.fetchProfile()
    .then((profile) => {
      this.profile = profile;
    })
    .catch((err) => {
      $log.error(err, err.message);
      // return $q.reject(err);
    });
  };

  this.fetchProfile();
}
