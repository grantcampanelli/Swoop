'use strict';

angular.module('mean.chapter').controller('ChapterController', ['$scope', 'Global', 'Chapter',
  function($scope, Global, Chapter) {
    $scope.global = Global;
    $scope.package = {
      name: 'chapter'
    };
  }
]);
