'use strict';

require('./_login.scss');

module.exports = ['$log', '$rootScope', '$location', 'authService',  LoginController ];

function LoginController($log, $rootScope, $location, authService){
  $log.debug('init LoginController');

  let query = $location.search();
  console.log('query', query.token);

  this.showSignin = true;

  if(query.token){
    authService.setToken(query.token)
    .then(() => {
      $location.path('/profile');
    });
  }
  
}
