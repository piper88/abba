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

  service.fetchProfile = function(profileID) {
    $log.debug('profileService.fetchProfile()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${profileID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.put(url, config);
    })
    .then(res => {
      $log.log('successful fetch user profile');
      service.profile = res.data;
      return service.profile;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateProfile = function(profileID, profileData) {
    $log.debug('profileService.fetchProfile()');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/profile/${profileID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      return $http.put(url, profileData, config);
    })
     .then( res => {
       let profile = res.data;
       $log.log('successful update user profile');
       return profile;
     })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };
  
  return service;
}


