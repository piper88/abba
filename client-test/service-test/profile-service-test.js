'use strict';

const camelcase = require('camelcase');

describe('testing profile service', function() {
  var url = 'http://localhost:3000/api';
  beforeEach(() => {
    angular.mock.module(camelcase(__TITLE__));
    angular.mock.inject((authService, profileService, $httpBackend, $window) => {
      this.authService = authService;
      authService.setToken('1234');

      this.profileService = profileService;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });

  describe('testing profileService.createProfile', () => {
    it('should return a profile', () => {
      let profileData = {
        firstName: 'Abba',
        lastName: 'Abba app',
        email: 'abba@gmail.com',
        phone: '(425)-598-555',
        status: 'owner',
      };

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST(`${url}/profile`, profileData, headers)
      .respond(200, {_id:'23770504', firstName: profileData.firstName,  lastName: profileData.lastName, email: profileData.email, phone: profileData.phone, status: profileData.status});

      this.profileService.createProfile(profileData)
      .then(profile => {
        for (var prop in profile)
          expect(profile[prop]).toBe(profileData[prop]);
      });
      this.$httpBackend.flush();
    });
  });
});