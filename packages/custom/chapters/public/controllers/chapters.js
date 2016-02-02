
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

var globalAvailableChapters = ['Kappa Sigma', 'Alpha Chi Omega'];
var globalAvailableColleges = ['Business', 'Engineering', 'Agriculture'];

angular.module('mean.chapters').controller('ChaptersController', ['$scope', '$stateParams', '$location', 'Global', 'Chapters', 'Members', 'MeanUser', 'Circles',
    function ($scope, $stateParams, $location, Global, Chapters, Members, MeanUser, Circles) {
        $scope.global = Global;

        $scope.hasAuthorization = function(chapter) {
            if (!chapter || !chapter.user) return false;
            return MeanUser.isAdmin || chapter.user._id === MeanUser.user._id;
        };

        $scope.availableCircles = [];

        /*
         * Start Custom code
         */
        $scope.availableChapters = globalAvailableChapters;

        $scope.availableColleges = globalAvailableColleges;

        $scope.orderByField = 'chapter';
        $scope.reverseSort = false;

        /*
         * End Custom code
         */


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
                console.log($scope.chapters);
            });
        };

        $scope.findOne = function() {
            Chapters.get({
                chapterId: $stateParams.chapterId
            }, function(chapter) {
                $scope.chapter = chapter;
            });
        };

        $scope.findMembersFromChapter = function (specifiedChapter) {
            console.log("made it to find members from chapter");
            var chapterName;
            Members.query(function (members) {
                $scope.members = members;
                console.log($scope.members);
            });
            Chapters.get({
                chapterId: $stateParams.chapterId
            }, function (chapter) {
                console.log(chapter);
                console.log("members in the get");
                console.log($filter('filter')($scope.members, {chapter: chapter.title}));
            });
            //console.log("chapter: "+specifiedChapter);
            //console.log("chapter: "+chapterName);
            //console.log("chapter: "+$scope.chapter);


            //Members.query(function(members) {
            //    $scope.members = members;
            //});
            Members.query(function (members) {
                $scope.members = members;
                console.log($scope.members);
            });


            //Members.get({}, function(member) {
            //    console.log(member);
            //});
            /// console.log($scope.members);

            //Members.query(function(members) {
            //    $scope.members = members;
            //});
            //$scope.members = $filter('filter')($scope.members, { chapter: chapterSpecified});
            //console.log($scope.members);
        }
    }
]);

angular.module('mean.chapters').controller('MembersController', ['$scope', '$stateParams', '$location', 'Global', 'Members', 'MeanUser', 'Circles',
    function ($scope, $stateParams, $location, Global, Members, MeanUser, Circles) {
        $scope.global = Global;

        $scope.hasAuthorization = function (member) {
            if (!member || !member.user) return false;
            return MeanUser.isAdmin || member.user._id === MeanUser.user._id;
        };

        $scope.availableCircles = [];


        /*
         * Start Custom code
         */
        $scope.availableChapters = globalAvailableChapters;

        $scope.availableColleges = globalAvailableColleges;

        $scope.orderByField = 'firstName';
        $scope.reverseSort = false;

        /*
         * End Custom code
         */


        //$scope.availablePointOfContacts = ['President', 'Social Chair', 'Risk Manager', 'Other'];

        //$scope.availableStartTimes = ['9:00am', '9:15am', '9:30am', '9:45am', '10:00am'];

        //$scope.availableEndTimes = ['9:00am', '9:15am', '9:30am', '9:45am', '10:00am'];


        Circles.mine(function (acl) {
            $scope.availableCircles = acl.allowed;
            $scope.allDescendants = acl.descendants;
        });

        $scope.showDescendants = function (permission) {
            var temp = $('.ui-select-container .btn-primary').text().split(' ');
            temp.shift(); //remove close icon
            var selected = temp.join(' ');
            $scope.descendants = $scope.allDescendants[selected];
        };

        $scope.selectPermission = function () {
            $scope.descendants = [];
        };

        $scope.create = function (isValid) {
            if (isValid) {
                // $scope.member.permissions.push('test test');
                var member = new Members($scope.member);

                member.$save(function (response) {
                    $location.path('members/' + response._id);
                });

                $scope.member = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function (member) {
            if (member) {
                member.$remove(function (response) {
                    for (var i in $scope.members) {
                        if ($scope.members[i] === member) {
                            $scope.members.splice(i, 1);
                        }
                    }
                    $location.path('members');
                });
            } else {
                $scope.member.$remove(function (response) {
                    $location.path('members');
                });
            }
        };

        $scope.update = function (isValid) {
            if (isValid) {
                var member = $scope.member;
                if (!member.updated) {
                    member.updated = [];
                }
                member.updated.push(new Date().getTime());

                member.$update(function () {
                    $location.path('members/' + member._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function () {
            Members.query(function (members) {
                $scope.members = members;
            });
        };

        $scope.findOne = function () {
            Members.get({
                memberId: $stateParams.memberId
            }, function (member) {
                $scope.member = member;
            });
        };
    }
]);