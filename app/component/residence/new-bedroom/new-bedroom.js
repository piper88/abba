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
    .then( bedroom => {
      this.newBed = bedroom;
      console.log('bedroom', bedroom);
    });
  };

  this.createEstimate = function(bedroom){
    if (bedroom.type === 'Master') return '100';
  };
}
