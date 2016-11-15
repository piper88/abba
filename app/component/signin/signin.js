'use strict';

module.exports = {
  template: require('./signin.html'),
  controller: ['$log', '$location', 'authService', SigninController],
  controllerAs: 'signinCtrl',
};

function SigninController($log, $location, authService) {
  $log.debug('init SigninCtrl');

  //need user email and password
  this.signin = function(){
    $log.debug('inti SigninCtrl.signin()');
    //authService
    authService.login(this.user)
    .then(() => {
      $location.path('/profile');
    })
    .catch(() => {
      console.log('failed to signin');
    });
  };
}
