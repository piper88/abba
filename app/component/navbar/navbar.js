'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$location', '$rootScope', '$window', 'authService', NavbarController],
  controllerAs: 'navbarCtrl',
  bindings: {
    appTitle: '@',
  },
};

function NavbarController($log, $location, $rootScope, $window, authService) {
  $log.debug('init navbarCtrl');

  function pageLoadHandler() {
    // if there is allready a token go the home page

    let path = $location.path();
    if (path === '/landing') {
      this.hideLogout = true;
      this.hideLogin = false;
    }

    if (path !== '/landing') {
      this.hideLogout = false;
      this.hideLogin = true;
    }

    authService.getToken()
      .then(() => {
        $location.url('/profile');
        this.hideLogin = true;
        this.hideLogout = false;
      })
      .catch(() => {
        let query = $location.search();
        if (query.token) {
          return authService.setToken(query.token)
            .then(() => {
              $location.url('/profile');
              this.hideLogin = true;
              this.hideLogout = false;
            });
        }
        $location.url('/landing');
      });
  }

  $window.onload = pageLoadHandler.bind(this);
  $rootScope.$on('locationChangeSuccess', pageLoadHandler.bind(this));

//do we need to call authService.login()?
  this.login = function() {
    this.hideLogout = true;
    this.hideLogin = true;

    $location.url('/login');
  };

  this.logout = function() {
    $log.log('navbarCtrl.logout()');
    this.hideLogout = true;
    this.hideLogin = false;
    authService.logout()
      .then(() => {
        $location.url('/');
      });
  };
}
