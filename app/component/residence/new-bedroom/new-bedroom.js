'use strict';

require('./_new-bedroom.scss');

module.exports = {
  template: require('./new-bedroom.html'),
  controller: ['$log','$http', 'residenceService', NewBedroomController],
  controllerAs: 'newBedroomCtrl',
  bindings: {
    residenceData: '<',
  },
};

function NewBedroomController($log, $http, residenceService ){
  $log.debug('init newBedroomCtrl');

  this.bedroom = {};
  this.createNewBed = function(){
    $log.debug('init createNewBedroom()');
    this.bedroom.estimate = this.createEstimate(this.bedroom);
    console.log('dsfsdfafasFasf',this.residenceData);
    residenceService.addNewBedroom(this.residenceData._id, this.bedroom)
    .then(bedroom => {
      this.newBed = bedroom;
      console.log('bedroom', bedroom);
    });
  };

  this.createEstimate = function(bedroom){
    let estimate = 0;
    let base = 100;
    if (bedroom.type === 'Master'){
      if (bedroom.bedSize === 'King'){
        if (bedroom.privateBath) {
          estimate = base * 1.2 * 1.2 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * 1.2 * 1.2 * .9;
          return estimate;
        }
      }
      if (bedroom.bedSize === 'Queen'){
        if (bedroom.privateBath) {
          estimate = base * 1.2 * 1.1 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * 1.2 * 1.1 * .9;
          return estimate;
        }
      }
      if (bedroom.bedSize === 'Double'){
        if (bedroom.privateBath) {
          estimate = base * 1.2 * .9 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * 1.2 * .9 * .9;
          return estimate;
        }
      }
    }
    if (bedroom.type === 'Regular'){
      if (bedroom.bedSize === 'King'){
        if (bedroom.privateBath) {
          estimate = base * .9 * 1.2 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * .9 * 1.2 * .9;
          return estimate;
        }
      }
      if (bedroom.bedSize === 'Queen'){
        if (bedroom.privateBath) {
          estimate = base * .9 * 1.1 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * .9 * 1.1 * .9;
          return estimate;
        }
      }
      if (bedroom.bedSize === 'Double'){
        if (bedroom.privateBath) {
          estimate = base * .9 * .9 * 1.2;
          return estimate;
        }
        if (!bedroom.privateBath) {
          estimate = base * .9 * .9 * .9;
          return estimate;
        }
      }
    }
  };
}
