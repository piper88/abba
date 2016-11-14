'use strict';

require('./_landing.scss');

module.exports = ['$log', '$rootScope', '$location', 'authService',  LandingController ];

function LandingController($log, $rootScope, $location, authService){
  $log.debug('init landingCtrl');

  let query = $location.search();

  if(query.token){
    authService.setToken(query.token)
    .then(() => {
      $location.path('/#/profile');
    });
  }

  $rootScope.$on('locationChangeSuccess', () => {
    let query = $location.search();
    console.log('query', query);
    if(query.token){
      authService.setToken(query.token)
      .then(() => {
        $location.path('/#/home');
      });
    }
  });
}
