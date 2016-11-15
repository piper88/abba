'use strict';

const camelcase = require('camelcase');

describe('testing signup controller', function() {
  var url = 'http://localhost:3000/api/signup';

  beforeEach(() => {
    angular.mock.module(camelcase(__TITLE__));
    angular.mock.inject(($q, $rootScope, authService, profileService, $componentController, $httpBackend, $location) => {
      authService.setToken('10001');
      this.$q = $q;
      this.authService = authService;
      this.profileService = profileService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.$location = $location;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingRequest();
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.authService.logout();
  });

  describe('testing signup-controller: create user', () => {
    let user = {
      email: 'ABBA3300@gmail.com',
      password: '1234',
    };

    let profile = {
      firstName: 'Abba',
      lastName: 'Abba app',
      email: user.email,
      phone: '(425)-598-555',
      status: 'owner',
    };

    it('it should create a user and profile', () => {
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };

      let profileHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1234',
      };

      this.$httpBackend.expectPOST(url, user, headers)
      .respond(200, '1234');

      this.$httpBackend.expectPOST('http://localhost:3000/api/profile', profile, profileHeaders)
      .respond(200, {_id: '23770504', firstName: 'Abba', lastName: 'Abba app', email: 'abba@gmail.com', phone: '(425)-598-555', status: 'owner'});

      let signupCtrl = this.$componentController('signup');
      signupCtrl.user = user;
      signupCtrl.profile = profile;
      signupCtrl.signup()
      .then(() => {
        expect(signupCtrl.profile.firstName).toEqual('Abba');
      });
      this.$httpBackend.flush();
      this.$rootScope.$apply();
      expect(true).toBe(true);
      //expect(this.authService.signup).toHaveBeenCalledWith(user);
     // expect(this.profileService.createProfile).toHaveBeenCalledWith(profile);
    });
  });
});
