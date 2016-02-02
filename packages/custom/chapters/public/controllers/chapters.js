
/* jshint -W098 */
//angular.module('mean.chapters').controller('ChaptersController', ['$scope', 'Global', 'Chapters',
//  function($scope, Global, Chapters) {
//    $scope.global = Global;
//    $scope.package = {
//      name: 'chapters'
//    };
//  }
//]);


'use strict';

angular.module('mean.chapters').controller('ChaptersController', ['$scope', '$stateParams', '$location', 'Global', 'Chapters', 'MeanUser', 'Circles',
    function($scope, $stateParams, $location, Global, Chapters, MeanUser, Circles) {
        $scope.global = Global;

        $scope.hasAuthorization = function(chapter) {
            if (!chapter || !chapter.user) return false;
            return MeanUser.isAdmin || chapter.user._id === MeanUser.user._id;
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
                // $scope.chapter.permissions.push('test test');
                var chapter = new Chapters($scope.chapter);

                chapter.$save(function(response) {
                    $location.path('chapters/' + response._id);
                });

                $scope.chapter = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(chapter) {
            if (chapter) {
                chapter.$remove(function(response) {
                    for (var i in $scope.chapters) {
                        if ($scope.chapters[i] === chapter) {
                            $scope.chapters.splice(i, 1);
                        }
                    }
                    $location.path('chapters');
                });
            } else {
                $scope.chapter.$remove(function(response) {
                    $location.path('chapters');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var chapter = $scope.chapter;
                if (!chapter.updated) {
                    chapter.updated = [];
                }
                chapter.updated.push(new Date().getTime());

                chapter.$update(function() {
                    $location.path('chapters/' + chapter._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Chapters.query(function(chapters) {
                $scope.chapters = chapters;
            });
        };

        $scope.findOne = function() {
            Chapters.get({
                chapterId: $stateParams.chapterId
            }, function(chapter) {
                $scope.chapter = chapter;
            });
        };
    }
]);