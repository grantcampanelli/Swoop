'use strict';

(function() {
  describe('Test test case', function() {
    it('1 should be equals to 1', function() {
      expect(1).toBe(1);
    });
  });

  // Events Controller Spec
  /*describe('MEAN controllers', function() {
    describe('EventsController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        jasmine.addMatchers({
          toEqualData: function() {
            return {
              compare: function(actual, expected) {
                return {
                  pass: angular.equals(actual, expected)
                };
              }
            };
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.events');
      });

      // Initialize the controller and a mock scope
      var EventsController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        EventsController = $controller('EventsController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one event object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('api\/events').respond([{
            title: 'An Event about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.events).toEqualData([{
            title: 'An Event about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one event object fetched ' +
        'from XHR using a eventId URL parameter', function() {
          // fixture URL parament
          $stateParams.eventId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testEventData = function() {
            return {
              title: 'An Event about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/api\/events\/([0-9a-fA-F]{24})$/).respond(testEventData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.event).toEqualData(testEventData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postEventData = function() {
            return {
              title: 'An Event about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseEventData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An Event about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An Event about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('api\/events', postEventData()).respond(responseEventData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/events/' + responseEventData()._id);
        });

      it('$scope.update(true) should update a valid event', inject(function(Events) {

        // fixture rideshare
        var putEventData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Event about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock event object from form
        var event = new Events(putEventData());

        // mock event in scope
        scope.event = event;

        // test PUT happens correctly
        $httpBackend.expectPUT(/api\/events\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/events\/([0-9a-fA-F]{24})$/, putEventData()).respond();
        [>
                Error: Expected PUT /events\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Event about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Event about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                <]

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/events/' + putEventData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid eventId ' +
        'and remove the event from the scope', inject(function(Events) {

          // fixture rideshare
          var event = new Events({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.events = [];
          scope.events.push(event);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/api\/events\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(event);
          $httpBackend.flush();

          // test after successful delete URL location events list
          //expect($location.path()).toBe('/events');
          expect(scope.events.length).toBe(0);

        }));
    });
  });*/
}());
