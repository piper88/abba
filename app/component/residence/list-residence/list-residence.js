'use strict';

require('./_list-residence.scss');

module.exports = {
  template: require('./list-residence.html'),
  controller: ['$log','$uibModal','residenceService', ListResidenceController],
  controllerAs: 'listResidenceCtrl',
  bindings: {
    residence: '<',
  },
};

function ListResidenceController($log, $uibModal, residenceService){
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
    residenceService.deleteResidence(residenceID)
    .then(()=> {
      $log.debug('removed residence');
    })
    .catch(() => {
      $log.debug('can not remove');
    });
  };
}
