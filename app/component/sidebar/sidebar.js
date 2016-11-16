'use strict';

require('./_sidebar.scss');

module.exports = {
  template: require('./sidebar.html'),
  controller: ['$log', '$window', '$rootScope', '$location', 'authService', 'profileService', SidebarController],
  controllerAs: 'sidebarCtrl',
  bindings: {
    profile: '=',
  },
};

function SidebarController($log){
  $log.debug('init sidebarCtrl');


  //get the profile by calling profile service with profileID
}
