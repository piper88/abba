'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    appTitle: '@',
  },
};

function NavbarController($log, $location, $rootScope, authService) {
  $log.debug('init navbarCtrl');

  // nav logic specific to $location.path()
  this.checkPath = function(){
    let path = $location.path();
    if (path === '/landing'){
      this.hideButtons = false;
      authService.getToken()
      .then(() => {
        $location.url('/landing');
      });
    }

    if (path !== '/landing'){
      this.hideButtons = false;
      authService.getToken()
      .catch(() => {
        $location.url('/landing');
      });
    }
  };

  // on pageload call this.checkPath()
  this.checkPath();

  // on page success page change call this.checkPath()
  $rootScope.$on('$locationChangeSuccess', () => {
    this.checkPath();
  });

  this.login = function(){
    this.hideButtons = true;
    authService.login()
    .then(() => {
      $location.url('/profile');
    });
  };

  this.logout = function(){
    $log.log('navbarCtrl.logout()');
    this.hideButtons = true;
    authService.logout()
    .then(() => {
      $location.url('/');
    });
  };
}
