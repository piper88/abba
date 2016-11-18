'use strict';

require('./_signup.scss');

module.exports = {
  template: require('./signup.html'),
  controller: ['$log', '$location', 'authService','profileService', SignupController],
  controllerAs: 'signupCtrl',
};

function SignupController($log, $location, authService, profileService){
  $log.debug('init Signup Ctrl');

  this.signup = function(){
    $log.debug('init signupCtrl.signup()');

    return authService.signup(this.user)
    .then(() => {
      this.profile.email = this.user.email;
      return profileService.createProfile(this.profile);
    })
    .then(profileData => {
      this.profile = profileData;
      $location.path('/profile');
    })
    .catch(() => {
      console.log('failed to signup');
    });
  };
}
