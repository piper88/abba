'use strict';

require('./_landing.scss');

module.exports = ['$log', '$rootScope', '$location', 'authService',  LandingController ];

function LandingController($log, $rootScope, $location, authService){
  $log.debug('init landingCtrl');

}
