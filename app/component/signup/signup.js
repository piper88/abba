'use strict';

require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService){
 
  this.signup = function(user){
    authService.signup(user)
    .then(() => {
        
    })
    .then(() => {
      $location.path('/#/profile');
    })
    .catch(() => {
      console.log('faild to signup');
    });
  };
}