'use strict';

const camelcase = require('camelcase');

describe('testing residence service', function() {
  var url = 'http://localhost:3000/api';
  let residenceData = {
    _id: '1234567',
    sqft: '900',
    type: 'House',
    street: '10th st',
    city: 'Seattle',
    state: 'WA',
    zip: '98007',
  };
  let bedroomData = {
    _id: '777',
    type: 'Private bedroom',
    bedSize: 'Queen',
    bedType: 'Air mattress',
    sleepNum: 2,
    privateBath: true,
  };

  beforeEach(() => {
    angular.mock.module(camelcase(__TITLE__));
    angular.mock.inject((authService, residenceService, $httpBackend, $window) => {
      this.authService = authService;
      authService.setToken('1234');

      this.residenceService = residenceService;
      this.$httpBackend = $httpBackend;
      this.$window = $window;
    });
  });

  afterEach(() => {
    this.authService.setToken(null);
    this.$window.localStorage.clear();
  });

  describe('testing residenceService.createResidence', () => {
    it('should create a profile', () => {

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST(`${url}/residence`, residenceData, headers)
      .respond(200, {_id: '1234567',sqft: '900',type: 'House',street: '10th st',city: 'Seattle',state: 'WA',zip: '98007'});

      this.residenceService.createResidence(residenceData)
      .then(residence => {
        for (var prop in residence) {
          expect(residence[prop]).toEqual(residenceData[prop]);
        }
      });
      this.$httpBackend.flush();
    });
  });

  describe('testing residenceService.createResidence', () => {
    it('should create a Residence', () => {

      let headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST(`${url}/residence`, residenceData, headers)
      .respond(200, {_id: '1234567',sqft: '900',type: 'House',street: '10th st',city: 'Seattle',state: 'WA',zip: '98007'});

      this.residenceService.createResidence(residenceData)
      .then(residence => {
        for (var prop in residence)
          expect(residence[prop]).toBe(residenceData[prop]);
      });
      this.$httpBackend.flush();
    });
  });

  describe('testing residenceService.deleteResidence', () => {

    it('should delete a residence', () => {

      let headers = {
        Accept: 'application/json, text/plain, */*',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectDELETE(`${url}/residence/${residenceData._id}`, headers)
      .respond(204);

      this.residenceService.deleteResidence(residenceData._id);
      this.$httpBackend.flush();
    });
  });

  describe('testing residenceService.fetchResidences', () => {
    it('should return all residences', () => {

      let headers = {
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectGET(`${url}/residence`, headers)
      .respond(200, {_id: '1234567',sqft: '900',type: 'House',street: '10th st',city: 'Seattle',state: 'WA',zip: '98007'});

      this.residenceService.fetchResidences()
      .then(residences => {
        for(var prop in residences) {
          expect(residences[prop]).toEqual(residenceData[prop]);
        }
      });
      this.$httpBackend.flush();
    });
  });

  describe('testing residenceService.createNewBedroom', () => {
    it('should create a new Bedroom', () => {

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer 1234',
      };

      this.$httpBackend.expectPOST(`${url}/residence/${residenceData._id}/bedroom`, bedroomData, headers)
      .respond(200, {_id: '777', type: 'Private bedroom', bedSize: 'Queen', bedType: 'Air mattress', sleepNum: 2, privateBath: true });

      this.residenceService.addNewBedroom(residenceData._id,bedroomData)
      .then(bedroom => {
        for (var prop in bedroom) {
          expect(bedroom[prop]).toEqual(bedroomData[prop]);
        }
      });
      this.$httpBackend.flush();
    });
  });
});
