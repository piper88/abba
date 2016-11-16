'use strict';

const camelcase = require('camelcase');

describe('testing newResidence controller', function() {
  var url = 'http://localhost:3000/api/residence';

  beforeEach(() => {
    angular.mock.module(camelcase(__TITLE__));
    angular.mock.inject(($q, $rootScope, authService, residenceService, $componentController, $httpBackend, $location) => {
      authService.setToken('10001');
      this.$q = $q;
      this.authService = authService;
      this.residenceService = residenceService;
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

  describe('testing newResidence-controller: create newResidence', () => {
    let residenceData = {
      dateBuilt: new Date(),
      sqft: '900',
      type: 'House',
      street: '10th st',
      city: 'Seattle',
      state: 'WA',
      zip: '98007',
      address:'address mock',
    };

    it('it should create a NEW residence', () => {
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 10001',
      };

      this.$httpBackend.expectPOST(url, residenceData, headers)
      .respond(200, {_id: '1234567',dateBuilt: residenceData.dateBuilt,sqft: '900',type: 'House',street: '10th st',city: 'Seattle',state: 'WA',zip: '98007', address:'address mock'});

      let newResidenceCtrl = this.$componentController('newResidence');
      newResidenceCtrl.createNewResidence(residenceData)
      .then(data => {
        for(let prop in data){
          expect(data[prop]).toEqual(residenceData[prop]);
        }
      });
      this.$httpBackend.flush();
      this.$rootScope.$apply();
    });
  });
});
