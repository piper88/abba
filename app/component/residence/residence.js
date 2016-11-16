'use strict';

require('./_residence.scss');

module.exports = {
  template: require('./residence.html'),
  controller: ['$log', '$window', '$rootScope', '$location', 'authService', 'residenceService', ResidenceController],
  controllerAs: 'residenceCtrl',
};

function ResidenceController($log, $window, $rootScope, $location, authService, residenceService){
  $log.debug('init homeCtrl');

  this.today = new Date();
  this.residences = [];

  this.fetchResidences = function(){
    residenceService.fetchResidences()
   .then( residences => {
     this.residences = residences;
     this.currentResidence = residences[0];
   });
  };

  this.residenceDeleteDone = function(residence){
    $log.debug('residenceCtrl.residenceDeleteDone()');
    if (this.currentResidence._id === residence._id){
      this.currentResidence = null;
    }
  };

  this.fetchResidences();
  $rootScope.$on('$locationChangeSuccess', () => {
    this.fetchResidences();
  });
}
