'use strict';

require('./_sidebar.scss');

module.exports = {
  template: require('./sidebar.html'),
  controller: ['$log', '$window', '$rootScope', '$location', 'authService', 'profileService', SidebarController],
  controllers: 'sidebarCtrl',
};

function SidebarController($log, $window, $rootScope, $location, authService, profileService){
  $log.debug('init sidebarCtrl');

  profileService.fetchProfile();

  //get the profile by calling profile service with profileID
}
