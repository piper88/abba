'use strict';

require('./_remove-residence-modal.scss');

module.exports = {
  template: require('./remove-residence-modal.html'),
  controller: ['$log', 'residenceService', RemoveResidenceModalController],
  controllerAs: 'removeResidenceModalCtrl',
  bindings: {
    modalInstance: '<',
    resolve: '<',
  },
};

function RemoveResidenceModalController($log, residenceService){
  $log.debug('init RemoveResidenceModalController');
  this.$onInit = function(){
    this.residence = this.resolve.residence;
  };

  this.cancel = function(){
    console.log('closing modal');
    this.modalInstance.close();
  };


  this.deleteResidence = function(residenceID) {
    residenceService.deleteResidence(residenceID)
    .then(()=> {
      $log.debug('removed residence');
      this.cancel();
    })
    .catch(() => {
      $log.debug('can not remove');
    });
  };
}
