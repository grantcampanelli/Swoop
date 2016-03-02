'use strict';

//var mongoose = require('mongoose');

angular.module('mean.chapters').controller('EventsController', ['$scope', '$stateParams', '$location', 'Global', 'Events', 'Chapters', 'MeanUser', 'Circles', 'Deliverables', 'RiskManagementTeams', 'Members', 'Comments',
    function ($scope, $stateParams, $location, Global, Events, Chapters, MeanUser, Circles, Deliverables, RiskManagementTeams, Members, Comments) {
        $scope.global = Global;

        //$scope.CommentSubmission = mongoose.model('CommentSubmission');

        $scope.hasAuthorization = function (event) {
            if (!event || !event.user) return false;
            return MeanUser.isAdmin || event.user._id === MeanUser.user._id;
        };

        $scope.isAppAdmin = function (event) {
            if (!event || !event.user) return false;
            return MeanUser.isAdmin;
        };

        $scope.isAppAdminAndSubmitted = function (event, deliverable) {
            if (!event || !event.user) return false;
            if (deliverable.status != 1)
                return false;
            return MeanUser.isAdmin;
        };



        $scope.isChapterAdmin = function (event) {
            if (!event || !event.user) return false;
            return MeanUser.user.chapter == event.chapter;
        };

        $scope.isChapterAdminAndNotSubmitted = function (event, deliverable) {
            if (!event || !event.user) return false;
            if (deliverable.status != "Waiting on you")
                return false;
            return MeanUser.user.chapter == event.chapter;
        };

        $scope.availableCircles = [];
        $scope.rmAvailablePositions = [
            {id: 1, text: 'Inside Sober Monitor'},
            {id: 2, text: 'Outside Sober Monitor'},
            {id: 3, text: 'Bartender'},
            {id: 4, text: 'Sober Exec'}];

        /*
         *
         * CUSTOM CODE START
         *
         */

        $scope.eventTypes =
            ['Chapter House Event',
                'Satellite House Event',
                'Third Party Venue Event'];

        $scope.identifications =
            ['Drivers License',
                'Government Issued ID',
                'Military ID'];

        $scope.guestListRequired = 1;

        $scope.deliverables = [];

        $scope.riskManagementTeam = [];

        $scope.riskManagementDocumentRequired = 1;

        $scope.riskManagementTeamRequired = 1;

        $scope.generateRiskManagementTeamTable = function (attendance) {
            var array = [];
            $scope.minSoberMonitors = Math.ceil(attendance / 30);
            console.log("min sober monitors: " + $scope.minSoberMonitors);
            array.push({'title': 'Sober Exec', 'name': 'Grant Campanelli'});
            for (var i = 1; i < $scope.minSoberMonitors; i++) {
                array.push({'title': 'Monitor ' + i, 'name': 'Grant Campanelli'});
            }
            console.log("Attendance: " + event.attendance);
            $scope.riskManagementTeamPositions = array;
        };

        $scope.postGuestListRequired = 1;

        $scope.thirdPartyEventManagementContractRequired = 1;

        $scope.riskManagementTeamPositions = [];
        //    = function () {
        //    var array = [];
        //    array.push({'title': 'Inside 1', 'name': 'Grant Campanelli'});
        //    array.push({'title': 'Inside 2', 'name': 'Grant Campanelli'});
        //    array.push({'title': 'Inside 3', 'name': 'Grant Campanelli'});
        //    array.push({'title': 'Inside 4', 'name': 'Grant Campanelli'});
        //    return array;
        //}();


        $scope.chapterNames = [];

        $scope.findAvailableChapters = function () {
            Chapters.query(function (chapters) {
                chapters.forEach(function (chapter) {
                    $scope.chapterNames.push(chapter.name);
                });
                $scope.chapterNames.sort();
                console.log($scope.chapterNames);
            });
        };

        //$scope.availableChapters = ['Kappa Sigma', 'Alpha Chi Omega'];

        $scope.availablePointOfContacts = ['President', 'Social Chair', 'Risk Manager', 'Other'];

        $scope.availableStartTimes = ['9:00am', '9:15am', '9:30am', '9:45am', '10:00am',
            '10:15am', '10:30am', '10:45am', '11:00am',
            '11:15am', '11:30am', '11:45am', '12:00pm',
            '12:15pm', '12:30pm', '12:45pm', '1:00pm',
            '1:15pm', '1:30pm', '1:45pm', '2:00pm',
            '2:15pm', '2:30pm', '2:45pm', '3:00pm',
            '3:15pm', '3:30pm', '3:45pm', '4:00pm',
            '4:15pm', '4:30pm', '4:45pm', '5:00pm',
            '5:15pm', '5:30pm', '5:45pm', '6:00pm',
            '6:15pm', '6:30pm', '6:45pm', '7:00pm',
            '7:15pm', '7:30pm', '7:45pm', '8:00pm',
            '8:15pm', '8:30pm', '8:45pm', '9:00pm',
            '9:15pm', '9:30pm', '9:45pm', '10:00pm',
            '10:15pm', '10:30pm', '10:45pm', '11:00pm',
            '11:15pm', '11:30pm', '11:45pm', '12:00am',
            '12:15am', '12:30am', '12:45am', '1:00am'];

        $scope.availableEndTimes =
            ['9:00am', '9:15am', '9:30am', '9:45am', '10:00am',
                '10:15am', '10:30am', '10:45am', '11:00am',
                '11:15am', '11:30am', '11:45am', '12:00pm',
                '12:15pm', '12:30pm', '12:45pm', '1:00pm',
                '1:15pm', '1:30pm', '1:45pm', '2:00pm',
                '2:15pm', '2:30pm', '2:45pm', '3:00pm',
                '3:15pm', '3:30pm', '3:45pm', '4:00pm',
                '4:15pm', '4:30pm', '4:45pm', '5:00pm',
                '5:15pm', '5:30pm', '5:45pm', '6:00pm',
                '6:15pm', '6:30pm', '6:45pm', '7:00pm',
                '7:15pm', '7:30pm', '7:45pm', '8:00pm',
                '8:15pm', '8:30pm', '8:45pm', '9:00pm',
                '9:15pm', '9:30pm', '9:45pm', '10:00pm',
                '10:15pm', '10:30pm', '10:45pm', '11:00pm',
                '11:15pm', '11:30pm', '11:45pm', '12:00am',
                '12:15am', '12:30am', '12:45am', '1:00am'];

        $scope.hideOtherPointOfContact = function (pointofcontact) {
            if (pointofcontact == 'Other') {
                //console.log("point of contact clicked: "+pointofcontact);
                $('.pointofcontactother').removeClass("ng-hide");
                $('.pointofcontactother').addClass("ng-show");
                $('.pointofcontactinput').prop('required', true);
            }
            else {
                $('.pointofcontactother').removeClass("ng-show");
                $('.pointofcontactother').addClass("ng-hide");
                $('.pointofcontactinput').removeAttr('required');
            }
            //console.log("Hide other point of contact function");
        };

        /*
         *
         * CUSTOM CODE END
         *
         */

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

        /* generate delivarables */
        $scope.generateDeliverables = function (event) {
            //var numHosts = 1;
            //var deliverables = [];
            var d;
            event.deliverables = [];

            //if(event.coHosts)
            //    numHosts+ event.coHosts.length;

            //console.log("Hosts: " +numHosts);

            // Add Risk Management Plan
            d = new Deliverables({
                type: "String",
                name: "Risk Management Plan",
                status: "Waiting on you",
                comments: []
            });
            event.deliverables.push(d);

            var arr = [];
            $scope.minSoberMonitors = Math.ceil(event.attendance / 30);
            console.log("This is the right number: " + $scope.minSoberMonitors);
            // Add Risk Management Team
            var rm = new RiskManagementTeams({
                position: "Sober Exec",
                member: null
            });
            arr.push(rm);
            for (var i = 0; i < $scope.minSoberMonitors; i++) {
                rm = new RiskManagementTeams({
                    position: "Sober Monitor " + i,
                    member: null
                });
                arr.push(rm);
            }
            d = new Deliverables({
                type: "Array",
                name: "Risk Management Team",
                status: "Waiting on you",
                rmArray: arr,
                comments: []
            });
            event.deliverables.push(d);

            if (event.howAlcoholProvided != "BYOB") {
                d = new Deliverables({
                    type: "File",
                    name: "Third Party Liquor License",
                    status: "Waiting on you",
                    comments: []
                });
                event.deliverables.push(d);
            }
            if (event.thirdPartyEventManagement == true) {
                d = new Deliverables({
                    type: "File",
                    name: "Third Party Event Management Contract",
                    status: "Waiting on you",
                    comments: []
                });
                event.deliverables.push(d);
            }

            if (event.transportation == true) {
                d = new Deliverables({
                    type: "File",
                    name: "Third Party Transportation Contract",
                    status: "Waiting on you",
                    comments: []
                });
                event.deliverables.push(d);
            }

            d = new Deliverables({
                type: "File",
                name: "Pre Event Guest List",
                status: "Waiting on you",
                comments: []
            });
            event.deliverables.push(d);

            d = new Deliverables({
                type: "File",
                name: "Post Event Guest List",
                status: "Waiting on you",
                comments: []
            });
            event.deliverables.push(d);

            d = new Deliverables({
                type: "String",
                name: "Post Event Review",
                status: "Waiting on you",
                comments: []
            });
            event.deliverables.push(d);

            return event;

            //console.log($scope.event);


            //
            //if(event.coHosts.length) {
            //    numHosts +=
            //}
        };

        $scope.createEvent = function (isValid) {
            if (isValid) {
                // $scope.event.permissions.push('test test');

                //$scope.generateDeliverables();
                var event = new Events($scope.event);
                event = $scope.generateDeliverables(event);
                event.$save(function (response) {
                    $location.path('events/' + response._id);
                });

                $scope.event = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.removeEvent = function (event) {
            if (event) {
                event.$remove(function (response) {
                    for (var i in $scope.events) {
                        if ($scope.events[i] === event) {
                            $scope.events.splice(i, 1);
                        }
                    }
                    $location.path('events');
                });
            } else {
                $scope.event.$remove(function (response) {
                    $location.path('events');
                });
            }
        };

        $scope.updateEvent = function (isValid) {
            if (isValid) {
                var event = $scope.event;
                if (!event.updated) {
                    event.updated = [];
                }

                //var comment = new Comments();
                //comment.comment =  "This is the first comment";
                //comment.fileURL =  "path/to/url";
                //event.deliverables[0].comments.push(comment);

                event.updated.push(new Date().getTime());
                console.log("checking if its there");
                console.log(event);

                event.$update(function () {
                    $location.path('events/' + event._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.updateDeliverableContent = function (deliverable) {
            $scope.event.deliverables = $scope.deliverables;
            console.log("Updated deliverables");
            console.log($scope.event);
            //if (isValid) {
            //
            //    $scope.event.deliverables = $scope.deliverables;

            //
            //var event = $scope.event;
            //if (!event.updated) {
            //    event.updated = [];
            //}
            //event.updated.push(new Date().getTime());
            //
            //event.$update(function () {
            //    $location.path('events/' + event._id);
            //});
            //} else {
            //    $scope.submitted = true;
            //}
        };

        $scope.findEvents = function () {
            Events.query(function (events) {
                $scope.events = events;
            });
        };

        $scope.findOneEvent = function () {
            Events.get({
                eventId: $stateParams.eventId
            }, function (event) {
                $scope.event = event;
                $scope.deliverables = event.deliverables;
                //$scope.riskManagementTeam = event.arrContent;
                console.log('eventID' + $stateParams.eventId);
                console.log(event.deliverables[0]);
                //$scope.deliverables = [];
                //$scope.generateDeliverables(event);
                console.log($scope.event);

                $scope.generateRiskManagementTeamTable(event.attendance);
            });
        };

        $scope.members;

        $scope.findMembers = function () {
            if (!$scope.members) {
                $scope.members = [];
                Members.query(function (members) {
                    //console.log(members);
                    //members;
                    //$scope.membersLoading = 0;
                    //$scope.exportMembers();
                    $scope.members = []
                    members.forEach(function (member) {
                        if (member.chapter == $scope.event.chapter)
                            $scope.members.push(member);
                    });
                    //console.log($scope.members);
                });
            }
        };

        $scope.updateRMTeam = function (risk, member) {
            risk.member = new Members();

            //console.log(risk.position + " " + member.firstName)
            risk.member = member;
            console.log("Updated RM?");
        };


        /* Event File Submission */

        $scope.uploadFileCallback = function(file, deliverable, event) {

            var comment = new Comment();
            comment.comment =  "This is the first comment";
            comment.fileURL =  file.src;
            comment.user = MeanUser.user;
            deliverable.comments.push(comment);
            $scope.event = event;

            event.$update(function () {
                $location.path('events/' + event._id);
            });

        };

        /* Event Comment File Callback */
        $scope.commentUploadFileCallback = function (file, deliverable, event) {
            var comment = new Comment();
            comment.comment = "This is the first comment";
            comment.fileURL = file.src;
            comment.user = MeanUser.user;
            deliverable.comments.push(comment);
            $scope.event = event;

            event.$update(function () {
                $location.path('events/' + event._id);
            });

        };


        $scope.uploadFinished = function(files) {
            console.log(files);
        };


    }
]);