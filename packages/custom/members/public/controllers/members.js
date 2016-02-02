
/* jshint -W098 */
//angular.module('mean.members').controller('MembersController', ['$scope', 'Global', 'Members',
//  function($scope, Global, Members) {
//    $scope.global = Global;
//    $scope.package = {
//      name: 'members'
//    };
//  }
//]);


'use strict';

angular.module('mean.members').controller('MembersController', ['$scope', '$stateParams', '$location', 'Global', 'Members', 'MeanUser', 'Circles',
  function($scope, $stateParams, $location, Global, Members, MeanUser, Circles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(member) {
      if (!member || !member.user) return false;
      return MeanUser.isAdmin || member.user._id === MeanUser.user._id;
    };

    $scope.availableCircles = [];

    $scope.availableChapters = ['Kappa Sigma', 'Alpha Chi Omega'];

    $scope.availableColleges = ['Business', 'Engineering', 'Agriculture'];

    $scope.orderByField = 'firstName';
    $scope.reverseSort = false;


    //$scope.availablePointOfContacts = ['President', 'Social Chair', 'Risk Manager', 'Other'];

    //$scope.availableStartTimes = ['9:00am', '9:15am', '9:30am', '9:45am', '10:00am'];

    //$scope.availableEndTimes = ['9:00am', '9:15am', '9:30am', '9:45am', '10:00am'];


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
        // $scope.member.permissions.push('test test');
        var member = new Members($scope.member);

        member.$save(function(response) {
          $location.path('members/' + response._id);
        });

        $scope.member = {};

      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(member) {
      if (member) {
        member.$remove(function(response) {
          for (var i in $scope.members) {
            if ($scope.members[i] === member) {
              $scope.members.splice(i, 1);
            }
          }
          $location.path('members');
        });
      } else {
        $scope.member.$remove(function(response) {
          $location.path('members');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var member = $scope.member;
        if (!member.updated) {
          member.updated = [];
        }
        member.updated.push(new Date().getTime());

        member.$update(function() {
          $location.path('members/' + member._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Members.query(function(members) {
        $scope.members = members;
      });
    };

    $scope.findOne = function() {
      Members.get({
        memberId: $stateParams.memberId
      }, function(member) {
        $scope.member = member;
      });
    };
  }
]);