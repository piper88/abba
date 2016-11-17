'use strict';

require('./_new-residence.scss');

module.exports = {
  template: require('./new-residence.html'),
  controller: ['$log', '$window', '$rootScope', '$location', 'authService', 'residenceService', NewResidenceController],
  controllerAs: 'newResidenceCtrl',
};

function NewResidenceController($log, $window, $rootScope, $location, authService, residenceService){
  $log.debug('init residenceCtrl');


  this.pageChanged = function() {
    $log.log('Page changed to: ' + this.currentPage);
  };

  this.residences = [];
  this.states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  this.createNewResidence = function(residence){
    $log.debug('init createNewResidences()');
    console.log(residence);
    return residenceService.createResidence(residence)
   .then( data => {
     this.residences.unshift(data);
     console.log('newResidenc', data);
   });
  };
  this.fetchResidences = function() {
    residenceService.fetchResidences()
    .then(data => {
      this.residences = data;
    });
  };

  this.getResidence = function(residenceData) {
    
    this.currentResidence = residenceData;
    console.log(this.currentResidence);
    return this.currentResidence;
  };

  this.deleteResidence = function(residenceID) {
    residenceService.deleteResidence(residenceID)
    .then(()=> {
      $log.debug('removed residence');
      for(let i=0; i< this.residences.length; i++) {
        if(residenceID === this.residences[i]._id)
          this.residences.splice(i,1);
      }
    })
    .catch(() => {
      $log.debug('can not remove');
    });
  };

  this.fetchResidences();
  this.currentPage = 1;
  this.maxSize = 4;
  this.bigTotalItems = 20;
  this.bigCurrentPage = 1;

}
