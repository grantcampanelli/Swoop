'use strict';

//Setting up route
angular.module('mean.events').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('all events', {
        url: '/events',
        templateUrl: '/events/views/list.html',
        requiredCircles : {
          circles: ['authenticated'],
          denyState: 'auth.login'
        }
      })
      .state('create event', {
        url: '/events/create',
        templateUrl: '/events/views/create.html',
        requiredCircles : {
          circles: ['can create content']
        }
      })
      .state('edit event', {
        url: '/events/:eventId/edit',
        templateUrl: '/events/views/edit.html',
        requiredCircles : {
          circles: ['can edit content']
        }
      })
      .state('event by id', {
        url: '/events/:eventId',
        templateUrl: '/events/views/view.html',
        requiredCircles : {
          circles: ['authenticated'],
          denyState: 'auth.login'
        }
      });
  }
]);
