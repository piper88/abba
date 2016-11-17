'use strict';

require('./_list-residence.scss');

module.exports = {
  template: require('./list-residence.html'),
  controller: ['$log', '$window', '$uibModal','residenceService', ListResidenceController],
  controllerAs: 'listResidenceCtrl',
  bindings: {
    residence: '<',
  },
};

function ListResidenceController($log, $window, $uibModal, residenceService){
  $log.debug('init residenceCtrl');

  this.openPopupModal = function() {
    $uibModal.open({
      component:'bedroomModal',
      resolve: {
        residence: () => {
          return this.residence;
        },
      },
    });
  };

  this.openPopupModalRemoveResidence = function() {
    $uibModal.open({
      component:'removeResidenceModal',
      resolve: {
        residence: () => {
          return this.residence;
        },
      },
    });
  };

  this.getBedrooms = function(residenceID) {
    residenceService.fetchBedrooms(residenceID)
    .then(bedrooms => {
      this.residenceBedrooms = bedrooms;
    })
    .catch(() => {
      $log.debug('could not get bedrooms');
    });
  };

  this.deleteResidence = function(residenceID) {
    if($window.confirm('Are you sure you want to delete this?')){
      residenceService.deleteResidence(residenceID)
      .then(()=> {
        $log.debug('removed residence');
      })
      .catch(() => {
        $log.debug('can not remove');
      });
    }
  };
}
