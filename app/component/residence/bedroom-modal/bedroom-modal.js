'use strict';

require('./_bedroom-modal.scss');

module.exports = {
  template: require('./bedroom-modal.html'),
  controller: ['$log', BedroomModalController],
  controllerAs: 'bedroomModalCtrl',
  bindings: {
    modalInstance: '<',
    resolve: '<',
  },
};

function BedroomModalController($log){
  $log.debug('init BedroomModalController');
  this.$onInit = function(){
    this.residence = this.resolve.residence;
  };
}
