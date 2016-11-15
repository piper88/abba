'use strict';

const camelcase = require('camelcase');

describe('testing profile service', function() {
  var url = 'http://localhost:3000/api';
  let profileData = {
    firstName: 'Abba',
    lastName: 'Abba app',
    email: 'abba@gmail.com',
    phone: '(425)-598-555',
    status: 'owner',
  };
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
    it('should create a profile', () => {

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


  describe('testing galleryService.updateProfile', () => {    
    it('should update a profile', () => {
      let profileId = '1000',
        headers = {
          Accept: 'application/json',
          Authorization:'Bearer 1234',
          'Content-Type':'application/json;charset=utf-8',
        };
      this.$httpBackend.expectPUT(`${url}/profile/1000`, profileData, headers)
      .respond(200,  {_id:'1000', firstName: 'updated name',  lastName: 'updated name'});

      this.profileService.updateProfile(profileId, profileData)
      .then(profile => {
        expect(profile._id).toBe(profileId);
        expect(profile.firstName).toEqual('updated name');
        expect(profile.lastName).toEqual('updated name');
      });
      this.$httpBackend.flush();
    });
  });
});