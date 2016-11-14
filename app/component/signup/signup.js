'use strict';

require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService','profileService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService, profileService){
  $log.debug('init Singup Ctrl');

  this.signup = function(user, profile){
    $log.debug('init singupCtrl.signup()');

    authService.signup(user)
    .then(() => {
      profile.email = user.email;
      profileService.createProfile(profile);
    })
    .then(() => {
      $location.path('/profile');
    })
    .catch(() => {
      console.log('faild to signup');
    });
  };
}