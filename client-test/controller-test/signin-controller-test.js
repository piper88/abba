'use strict';

const camelcase = require('camelcase');

describe('testing signin controller', function(){
  var url = 'http://localhost:3000/api/login';

  beforeEach(() => {
    angular.mock.module(camelcase(__TITLE__));
    angular.mock.inject(($q, $rootScope, $componentController, $httpBackend, $location, $window, authService, profileService) => {
      authService.setToken('1234');
      this.$q = $q;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.$location = $location;
      this.$window = $window;
      this.authService = authService;
      this.profileService = profileService;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingRequest();
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.authService.logout();
  });

  describe('testing signinCtrl.signin()', () => {
    //mock user
    let exampleUser = {
      email: 'testing@gmail.com',
      password: '4747',
    };

    it('should successfully sign in user', () => {
      let base64 = this.$window.btoa(`${exampleUser.email}:${exampleUser.password}`);
      let headers = {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      };

      this.$httpBackend.expectGET(url, headers)
      .respond(200, '1234');

      let signinCtrl = this.$componentController('signin');
      signinCtrl.user = exampleUser;
      signinCtrl.signin();
      // .then(() => {
      //   expect(this.$location.path).toEqual('/profile');
      //   expect(exampleUser.token).toBe('4747');
      // });
    });
  });
});
