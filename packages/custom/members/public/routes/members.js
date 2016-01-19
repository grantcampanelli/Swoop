'use strict';

angular.module('mean.members').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('members example page', {
      url: '/members/example',
      templateUrl: 'members/views/index.html'
    })
    .state('members allchapters', {
      url: '/members/allchapters',
      templateUrl: 'members/views/allchapters.html'
    })
    .state('members chapter1', {
        url: '/members/chapter1',
        templateUrl: '/members/views/chapter1.html'
        /*
,
        requiredCircles : {
          circles: ['can create content']
        }
*/
      })
    .state('members chapter2', {
      url: '/members/chapter2',
      templateUrl: 'members/views/chapter2.html'
    })
    .state('members chapter3', {
      url: '/members/chapter3',
      templateUrl: 'members/views/chapter3.html'
    })
    .state('members chapter4', {
      url: '/members/chapter4',
      templateUrl: 'members/views/chapter4.html'
    })
    .state('members chapter5', {
      url: '/members/chapter5',
      templateUrl: 'members/views/chapter5.html'
    })
    .state('members chapter6', {
      url: '/members/chapter6',
      templateUrl: 'members/views/chapter6.html'
    })
      ;
  }
]);
