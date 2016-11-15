'use strict';

module.exports = ['$stateProvider', '$urlRouterProvider', routerConfig];

function routerConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('' , 'landing');
  $urlRouterProvider.when('/' , 'landing');

  let states = [
    {
      name: 'landing',
      url: '/',
      controllerAs: 'landingCtrl',
      //controller: 'LandingController',
      template: require('../view/landing/landing.html'),
    },
    {
      name: 'login',
      url: '/login',
      controllerAs: 'loginCtrl',
      controller: 'LoginController',
      template: require('../view/login/login.html'),
    },
    {
      name: 'profile',
      url: '/profile',
      controllerAs: 'profileCtrl',
      controller: 'ProfileController',
      template: require('../view/profile/profile.html'),
    },
  ];

  states.forEach(state => {
    $stateProvider.state(state);
  });
}
