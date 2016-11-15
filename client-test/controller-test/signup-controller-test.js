'use strict';

const camelcase = require('camelcase');

describe('testing signup controller', function() {
  var url = 'http://localhost:3000/api/signup';

  beforeEach(() => {
    angular.mock.module(camelcase(__TITLE__));
    angular.mock.inject(($rootScope, authService, $componentController, $httpBackend, $location) => {
      authService.setToken('10001');

      this.authService = authService;
      this.$rootScope = $rootScope;
      this.$componentController = $componentController;
      this.$httpBackend = $httpBackend;
      this.$location = $location;
    });
  });

  afterEach(() => {
    this.$httpBackend.verifyNoOutstandingExpectation();
    this.$httpBackend.verifyNoOutstandingRequest();
    this.authService.logout();  
  });

  describe('testing signup-controller: create user', () => {
    // it('it should create a user', () => {
    //   let user = {
    //     email: 'ABBA',
    //     password: '1234',
    //   };
    //   let profile = {
    //     firstName: 'ABBA',
    //     lastName: '1234',
    //     email: user.email,
    //     phone: '555-555-5550',
    //   };
      
    //   let headers = {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   };

    //   this.$httpBackend.expectPOST(url, user, headers)
    //   .respond(200, {_id:'23770504', email: 'ABBA@app.com', password:'1234'});

    //   let signupCtrl = this.$componentController('signup');

    //   signupCtrl.signup(user, profile);
    //   this.$httpBackend.flush();
    //   this.$rootScope.$apply();

    //   expect(this.$location.path()).toBe('/profile');
    //   //expect(true).toEqual(true);
    // });
  });
});