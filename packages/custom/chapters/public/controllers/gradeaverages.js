angular.module('mean.chapters').controller('GradeAveragesController', ['$scope', '$stateParams', '$location', 'Global', 'GradeAverages', 'Chapters', 'MeanUser', 'Circles',
    function ($scope, $stateParams, $location, Global, GradeAverages, Chapters, MeanUser, Circles) {
        $scope.global = Global;

        $scope.hasAuthorization = function (gradeaverage) {
            if (!gradeaverage || !gradeaverage.user) return false;
            return MeanUser.isAdmin || gradeaverage.user._id === MeanUser.user._id;
        };

        $scope.availableCircles = [];


        /*
         * Start Custom code
         */
        $scope.chapterNames = [];
        $scope.databaseGPANames = []
        //
        $scope.findAvailableChapters = function () {
            var str;
            Chapters.query(function (chapters) {
                chapters.forEach(function (chapter) {
                    $scope.chapterNames.push(chapter.name);
                    str = chapter.name.replace(/\s/g, '').toLowerCase();
                    $scope.databaseGPANames.push(
                        {
                            'name': chapter.name,
                            'path': str,
                            'model': 'gradeaverage.' + str
                        });


                });
                $scope.chapterNames.sort();
                //$scope.databaseGPANames.sort();
                console.log($scope.databaseGPANames.sort());
                console.log("finding all available chapters...")
            });
        }();

        //$scope.initiateChapterGPAs = function() {
        //
        //};


        // $scope.availableColleges = globalAvailableColleges;

        //$scope.orderByField = 'firstName';
        //$scope.reverseSort = false;

        //$scope.years = ['2012', '2013', '2014','2015','2016', '2017', '2018'];
        $scope.quarters = ['Fall', 'Winter', 'Spring'];
        $scope.chapterGPAsGenerated = 0;

        $scope.showChaptersGPAs = function () {
            console.log("Show Chapter GPAs");
        };


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

        $scope.createGradeAverage = function (isValid) {
            if (isValid) {
                // $scope.gradeaverage.permissions.push('test test');
                var gradeaverage = new GradeAverages($scope.gradeaverage);
                //gradeaverage.kappasigma = 3.0;
                //for(var i = 0; i < $scope.chapterNames.length; i++) {
                //    name = $scope.chapterNames[i];
                //    //chapterGPA = new {
                //    //    'chapterName' : $scope.chapterNames[i],
                //    //    'gpa' : 0
                //    //};
                //    gradeaverage['chapters'].push({chapterName : name});
                //    //console.log($scope.chapterNames[i]);
                //}

                gradeaverage.permissions = "authenticated";
                console.log("create gradeaverage");
                console.log(gradeaverage);
                gradeaverage.$save(function (response) {
                    $location.path('gradeaverages/' + response._id);
                    console.log($location.path());
                });

                $scope.gradeaverage = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.removeGradeAverage = function (gradeaverage) {
            if (gradeaverage) {
                gradeaverage.$remove(function (response) {
                    for (var i in $scope.gradeaverages) {
                        if ($scope.gradeaverages[i] === gradeaverage) {
                            $scope.gradeaverages.splice(i, 1);
                        }
                    }
                    $location.path('gradeaverages');
                });
            } else {
                $scope.gradeaverage.$remove(function (response) {
                    $location.path('gradeaverages');
                });
            }
        };

        $scope.updateGradeAverage = function (isValid) {
            if (isValid) {
                var gradeaverage = $scope.gradeaverage;
                if (!gradeaverage.updated) {
                    gradeaverage.updated = [];
                }
                gradeaverage.updated.push(new Date().getTime());

                gradeaverage.$update(function () {
                    $location.path('gradeaverages/' + gradeaverage._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.gradeaveragesLoading = 1;

        $scope.findGradeAverages = function () {
            GradeAverages.query(function (gradeaverages) {
                //console.log(gradeaverages);
                $scope.gradeaverages = gradeaverages;
                $scope.gradeaveragesLoading = 0;
                //$scope.exportGradeAverages();
            });
        };

        $scope.findOneGradeAverage = function () {
            GradeAverages.get({
                gradeaverageId: $stateParams.gradeaverageId
            }, function (gradeaverage) {
                $scope.gradeaverage = gradeaverage;
            });
        };
        $scope.exportArray = [];

        $scope.exportGradeAverages = function () {
            var newGradeAverage = [];
            GradeAverages.query(function (gradeaverages) {
                gradeaverages.forEach(function (gradeaverage) {
                    newGradeAverage = [];
                    newGradeAverage = {
                        'firstName': gradeaverage.firstName,
                        'lastName': gradeaverage.lastName,
                        'calpolyemail': gradeaverage.calpolyemail,
                        'phone': gradeaverage.phone,
                        'chapter': gradeaverage.chapter
                    };
                    $scope.exportArray.push(newGradeAverage);
                });
            });

        }
    }
]);