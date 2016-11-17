'use strict';

require('./_list-residence.scss');

module.exports = {
  template: require('./list-residence.html'),
  controller: ['$log','$uibModal', ListResidenceController],
  controllerAs: 'listResidenceCtrl',
  bindings: {
    residence: '<',
  },
};

function ListResidenceController($log, $uibModal){
  $log.debug('init residenceCtrl');

  this.openPopupModal = function() {
    $uibModal.open({
      // template: '<bedroom-modal></bedroom-modal>',
      component:'bedroomModal',
      resolve: {
        residence: () => {
          return this.residence;
        },
      },
    });
  };

}
