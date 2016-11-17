'use strict';

require('./_bedroom-modal.scss');

module.exports = {
  template: require('./bedroom-modal.html'),
  controller: ['$log', '$uibModal', BedroomModalController],
  controllerAs: 'bedroomModalCtrl',
};

function BedroomModalController($log, $uibModal){
  $log.debug('init BedroomModalController');

  this.items = ['item1', 'item2', 'item3'];
  this.open = function() {
    var uibModalInstance = $uibModal.open({
      templateUrl: 'bedroom-modal.html',
      controller: 'modalCtrl',
      size: 'sm',
      resolve: {
        items: function () {
          return this.items;
        },
      },
    });
    uibModalInstance.result.then(function (selectedItem) {
      this.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}