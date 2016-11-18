'use strict';

require('./_new-bedroom.scss');

module.exports = {
  template: require('./new-bedroom.html'),
  controller: ['$log','$http', 'residenceService', 'picService', NewBedroomController],
  controllerAs: 'newBedroomCtrl',
  bindings: {
    residenceData: '<',
    closeModal: '&',
  },
};

function NewBedroomController($log, $http, residenceService, picService){
  $log.debug('init newBedroomCtrl');

  this.createNewBed = function(){
    $log.debug('init createNewBedroom()');
    this.bedroom.estimate = this.createEstimate(this.bedroom);
    console.log('dsfsdfafasFasf',this.residenceData);
    residenceService.addNewBedroom(this.residenceData._id, this.bedroom)
    .then(bedroom => {
      this.newBed = bedroom;
      console.log('bedroom', bedroom);
      // this.closeModal();
    });
  };

  this.pic = {};

  this.uploadBedroomPhoto = function(){
    $log.debug('init uploadBedroomPhoto');
    console.log(this.pic, 'THIS.PIC');
    // this.pic = {};
    picService.uploadBedroomPhoto(this.newBed, this.pic)
    .then(() => {
      this.bedroom.photo = this.pic;
      this.pic = null;
    });
  };

  this.bedroom = {};

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
