'use strict';

module.exports = ['$q', '$log', '$http', 'authService', ResidenceService];

function ResidenceService($q, $log, $http, authService){
  $log.debug('init ResidenceService');
  let service = {};
  service.residences = [];
  service.bedrooms = [];
  
  service.createResidence = function(residence){
    $log.debug('ResidenceService.createResidence()');

    return authService.getToken()
    .then ( token => {
      let url = `${__API_URL__}/api/residence`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, residence, config);
    })
    .then ( res => {
      $log.log('successful create residence');
      let residence = res.data;
      service.residences.unshift(residence);
      return residence;
    })
    .catch ( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchResidences = function(){
    $log.debug('residenceService.getToken()');
    return authService.getToken()
    .then ( token => {
      let url = `${__API_URL__}/api/residence`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.get(url, config);
    })
    .then( res => {
      $log.log('successful fetch of user residences');
      service.residences = res.data;
      return service.residences;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteResidence = function(residenceID){
    return authService.getToken()
    .then ( token => {
      let url = `${__API_URL__}/api/residence/${residenceID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.delete(url, config);
    })
    .then( () => {
      for (let i=0; i< service.residences.length; ++i){
        let current = service.residences[i];
        if (current._id === residenceID){
          service.residences.splice(i, 1);
          break;
        }
      }
      return;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.addNewBedroom = function(residenceID, bedroom) {
    $log.debug('ResidenceService.addNewBedroom()');

    return authService.getToken()
    .then ( token => {
      let url = `${__API_URL__}/api/residence/${residenceID}/bedroom`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      return $http.post(url, bedroom, config);
    })
    .then ( res => {
      $log.log('successful create bedroom');
      let bedroom = res.data;
      service.bedrooms.unshift(bedroom);
      return bedroom;
    })
    .catch ( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
