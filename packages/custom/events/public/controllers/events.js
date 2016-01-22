'use strict';

angular.module('mean.events').controller('EventsController', ['$scope', '$stateParams', '$location', 'Global', 'Events', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Events, MeanUser, Circles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(event) {
      if (!event || !event.user) return false;
      return MeanUser.isAdmin || event.user._id === MeanUser.user._id;
    };

    $scope.availableCircles = [];

    Circles.mine(function(acl) {
        $scope.availableCircles = acl.allowed;
        $scope.allDescendants = acl.descendants;
    });

    $scope.showDescendants = function(permission) {
        var temp = $('.ui-select-container .btn-primary').text().split(' ');
        temp.shift(); //remove close icon
        var selected = temp.join(' ');
        $scope.descendants = $scope.allDescendants[selected];
    };

    $scope.selectPermission = function() {
        $scope.descendants = [];
    };

    $scope.create = function(isValid) {
      if (isValid) {
        // $scope.event.permissions.push('test test');
        var event = new Events($scope.event);

        event.$save(function(response) {
          $location.path('events/' + response._id);
        });

        $scope.event = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(event) {
      if (event) {
        event.$remove(function(response) {
          for (var i in $scope.events) {
            if ($scope.events[i] === event) {
              $scope.events.splice(i, 1);
            }
          }
          $location.path('events');
        });
      } else {
        $scope.event.$remove(function(response) {
          $location.path('events');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var event = $scope.event;
        if (!event.updated) {
          event.updated = [];
        }
        event.updated.push(new Date().getTime());

        event.$update(function() {
          $location.path('events/' + event._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Events.query(function(events) {
        $scope.events = events;
      });
    };

    $scope.findOne = function() {
      Events.get({
        eventId: $stateParams.eventId
      }, function(event) {
        $scope.event = event;
      });
    };
  }
]);