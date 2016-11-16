'use strict';

require('./_new-residence.scss');

module.exports = {
  template: require('./new-residence.html'),
  controller: ['$log', '$window', '$rootScope', '$location', 'authService', 'residenceService', NewResidenceController],
  controllerAs: 'newResidenceCtrl',
};

function NewResidenceController($log, $window, $rootScope, $location, authService, residenceService){
  $log.debug('init residenceCtrl');
  this.newResidences = [];
  
  this.createNewResidence = function(residence){
    $log.debug('init createNewResidences()');
    //residence.bedrooms = [];
    //residence.address = 'unique address';
    return residenceService.createResidence(residence)
   .then( residence => {
     this.newResidence = residence;
     this.newResidences.push(residence);
     console.log('newResidenc', this.newResidence);
   });
  };
  this.getResidence = function(residenceData) {
    
    this.currentResidence = residenceData;
    console.log(this.currentResidence);
    return this.currentResidence;
  };
}
