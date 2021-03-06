angular.module('mean.chapters').controller('MembersController', ['$scope', '$stateParams', '$location', 'Global', 'Members', 'Chapters', 'MeanUser', 'Circles',
    function ($scope, $stateParams, $location, Global, Members, Chapters, MeanUser, Circles) {
        $scope.global = Global;

        $scope.hasAuthorization = function (member) {
            if (!member || !member.user) return false;
            return MeanUser.isAdmin || member.user._id === MeanUser.user._id;
        };

        $scope.availableCircles = [];


        /*
         * Start Custom code
         */
        $scope.chapterNames = [];

        $scope.findAvailableChapters = function () {
            Chapters.query(function (chapters) {
                chapters.forEach(function (chapter) {
                    $scope.chapterNames.push(chapter.name);
                });
                $scope.chapterNames.sort();
            });
        };


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

        $scope.createMember = function (isValid) {
            if (isValid) {
                // $scope.member.permissions.push('test test');
                var member = new Members($scope.member);
                member.permissions = "authenticated";
                console.log("create member");
                console.log(member);
                member.$save(function (response) {
                    $location.path('members/' + response._id);
                    console.log($location.path());
                });

                $scope.member = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.removeMember = function (member) {
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

        $scope.updateMember = function (isValid) {
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

        $scope.membersLoading = 1;

        $scope.findMembers = function () {
            Members.query(function (members) {
                //console.log(members);
                $scope.members = members;
                $scope.membersLoading = 0;
                $scope.exportMembers();
            });
        };

        $scope.listMembers = function () {
            console.log("meanUser chapter");
            console.log(MeanUser.getChapter);
            if (!$scope.members)
                $scope.members = [];
            Members.query(function (members) {
                //console.log(members);
                if (MeanUser.isAdmin) {
                    $scope.members = members;

                }
                else {
                    var chapter = MeanUser.getChapter;
                    members.forEach(function (member) {
                        if (member.chapter == chapter) {
                            $scope.members.push(member);
                        }
                    })
                }

                $scope.membersLoading = 0;
                $scope.exportMembers();


            });
        };

        $scope.findOneMember = function () {
            Members.get({
                memberId: $stateParams.memberId
            }, function (member) {
                $scope.member = member;
            });
        };
        $scope.exportArray = [];

        $scope.exportMembers = function () {
            var newMember = [];
            Members.query(function (members) {
                members.forEach(function (member) {
                    newMember = [];
                    newMember = {
                        'firstName': member.firstName,
                        'lastName': member.lastName,
                        'calpolyemail': member.calpolyemail,
                        'phone': member.phone,
                        'chapter': member.chapter
                    };
                    $scope.exportArray.push(newMember);
                });
            });

        }
    }
]);