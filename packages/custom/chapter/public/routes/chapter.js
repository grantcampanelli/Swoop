'use strict';

angular.module('mean.chapter').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('chapter dashboard', {
      url: '/chapter/dashboard',
      templateUrl: 'chapter/views/dashboard.html'
    });
  }
]);
