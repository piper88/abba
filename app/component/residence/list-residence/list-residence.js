'use strict';

require('./_list-residence.scss');

module.exports = {
  template: require('./list-residence.html'),
  controller: ['$log', ListResidenceController],
  controllerAs: 'listResidenceCtrl',
  bindings: {
    residence: '<',
  },
};

function ListResidenceController($log){
  $log.debug('init residenceCtrl');

  // this.today = new Date();
  // // this.residences = [];
  //
  // this.fetchResidences = function(){
  //   residenceService.fetchResidences()
  //  .then( residences => {
  //    this.residences.push(residences);
  //    this.currentResidence = residences[0];
  //  });
  // };

  // this.residenceDeleteDone = function(residence){
  //   $log.debug('residenceCtrl.residenceDeleteDone()');
  //   if (this.currentResidence._id === residence._id){
  //     this.currentResidence = null;
  //   }
  // };

  // this.fetchResidences();
  // $rootScope.$on('$locationChangeSuccess', () => {
  //   this.fetchResidences();
  // });
}
