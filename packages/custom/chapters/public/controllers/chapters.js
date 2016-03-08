
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
var globalAvailableCouncils = ['IFC', 'PHA', 'USFC'];
var globalAvailableColleges = ['Orfalea College of Business',
    'Agriculture Food & Environmental Sciences',
    'Science and Mathematics',
    'Engineering',
    'Liberal Arts',
    'Architecture'];

angular.module('mean.chapters').controller('ChaptersController', ['$scope', '$stateParams', '$location', 'Global', 'Chapters', 'Members', 'Users', 'GradeAverages', 'Circles',
    function ($scope, $stateParams, $location, Global, Chapters, Members, Users, GradeAverages, Circles) {
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

        $scope.availableCouncils = globalAvailableCouncils;

        $scope.orderByField = 'name';
        $scope.reverseSort = false;

        $scope.chapterExec = [];

        $scope.getChapterExec = function () {
            var chapterName;
            Chapters.get({
                chapterId: $stateParams.chapterId
            }, function (chapter) {
                $scope.chapter = chapter;
                if ($scope.chapter)
                    console.log(chapter);
                else {
                    console.log("No chapter");
                    return;
                }
                chapterName = chapter.name;
                Users.query({}, function (users) {
                    console.log(users);
                    users.forEach(function (user) {
                        if (user.chapter == chapterName) {
                            $scope.chapterExec.push(user);
                        }
                    });
                    console.log($scope.chapterExec);
                });
            });
        };


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

        $scope.createChapter = function (isValid) {
            if (isValid) {
                // $scope.chapter.permissions.push('test test');
                var chapter = new Chapters($scope.chapter);
                chapter.permissions = [];
                chapter.permissions.push("authenticated");

                chapter.$save(function(response) {
                    $location.path('chapters/' + response._id);
                });

                $scope.chapter = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.removeChapter = function (chapter) {
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

        $scope.updateChapter = function (isValid) {
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

        $scope.findChapters = function () {
            Chapters.query(function(chapters) {
                $scope.chapters = chapters;
                console.log($scope.chapters);
            });
        };

        $scope.findOneChapter = function () {
            Chapters.get({
                chapterId: $stateParams.chapterId
            }, function(chapter) {
                $scope.chapter = chapter;
            });
        };

        /*
         * Member Specific Controller Info
         */

        /*
         * Custom Functions
         */

        $scope.findMembersFromChapter = function (specifiedChapter) {
            console.log("made it to find members from chapter");
            var chapterName;
            Members.query(function (members) {
                $scope.members = members;
                console.log($scope.members);
            });
            //Chapters.get({
            //    chapterId: $stateParams.chapterId
            //}, function (chapter) {
            //    console.log(chapter);
            //    console.log("members in the get");
            //    console.log($filter('filter')($scope.members, {chapter: chapter.name}));
            //});
            Members.query(function (members) {
                $scope.members = members;
                console.log($scope.members);
            });
        };

        $scope.hideMembers = 1;

        $scope.toggleHideMembers = function () {
            $scope.hideMembers = 1;
        };

        $scope.toggleShowMembers = function () {
            $scope.hideMembers = 0;
        };


        $scope.gradeLabels = [];//["January", "February", "March", "April", "May", "June", "July"];
        $scope.gradeSeries = [];//['Series A', 'Series B'];
        $scope.gradeData = [];
        //[65, 59, 80, 81, 56, 55, 40],
        //[28, 48, 40, 19, 86, 27, 90]
        //[65, 59],
        //[28, 48]
        //];

        $scope.buildChapterGPAGraph = function () {
            $scope.findOneChapter();
            GradeAverages.query(function (gradeaverages) {
                console.log(gradeaverages);

                var chapterModelPath = $scope.chapter.name.toLowerCase();
                chapterModelPath = chapterModelPath.replace(/\s/g, '');
                console.log('Model path: ' + chapterModelPath);


                var chapterData = [];
                var calPolyMensGPAs = [];
                var ifcGPAs = [];
                var calPolyWomensGPAs = [];
                var phaGPAs = [];
                if ($scope.chapter.council == 'IFC') {
                    $scope.gradeSeries.push("CP Mens GPA");
                    $scope.gradeSeries.push("IFC GPA");
                }
                else if ($scope.chapter.council == 'PHA') {
                    $scope.gradeSeries.push("CP Womens GPA");
                    $scope.gradeSeries.push("PHA GPA");
                }

                $scope.gradeSeries.push($scope.chapter.name);
                // Build Labels
                gradeaverages.reverse();
                gradeaverages.forEach(function (gpa) {
                    $scope.gradeLabels.push(gpa.quarter + ' ' + gpa.year);
                    chapterData.push(gpa[chapterModelPath]);
                    calPolyMensGPAs.push(gpa['calpolymensgpa']);
                    calPolyWomensGPAs.push(gpa['calpolywomensgpa']);
                    ifcGPAs.push(gpa['ifcgpa']);
                    phaGPAs.push(gpa['phagpa']);

                });


                if ($scope.chapter.council == 'IFC') {
                    $scope.gradeData.push(calPolyMensGPAs);
                    $scope.gradeData.push(ifcGPAs);
                }
                else if ($scope.chapter.council == 'PHA') {
                    $scope.gradeData.push(calPolyWomensGPAs);
                    $scope.gradeData.push(phaGPAs);
                }

                $scope.gradeData.push(chapterData);
            });
        };

        $scope.gradeColours = ['#ff3300', '#0033cc', '#00cc00'];


        //$scope.onClick = function (points, evt) {
        //    console.log(points, evt);
        //};
    }

]);

