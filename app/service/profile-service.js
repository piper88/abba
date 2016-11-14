'use strict';

module.exports = ['$q', '$log', '$http', 'authService', profileService];

function profileService($q, $log, $http , authService) {
  $log.debug('init profile Service');

  let service = {};
  service.profile;
  
  service.createProfile = function(profile) {
    $log.debug('profileService.createProfile()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.post(url, profile, config);
    })
    .then(res => {
      $log.log('successful create profile');
      service.profile = res.data;
      console.log('res.data', res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  return service;
}


