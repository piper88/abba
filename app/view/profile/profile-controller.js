'use strict';

require('./_profile.scss');

module.exports = ['$log', '$rootScope', '$location', 'authService',  LoginController ];

function LoginController($log){
  $log.debug('init LoginController');
}
