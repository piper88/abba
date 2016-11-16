'use strict';

require('./_new-bedroom.scss');

module.exports = {
  template: require('./new-bedroom.html'),
  controller: ['$log', NewBedroomController],
  controllerAs: 'newBedroomCtrl',
};

function NewBedroomController($log){
  $log.debug('init newBedroomCtrl');
  
  this.createNewBed = function(){
    $log.debug('init createNewBedroom()');
  };
}
