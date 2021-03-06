'use strict';

angular.module('mean.chapters').controller('EventsController', ['$scope', '$window', '$stateParams', '$location', 'Global', 'Events',
    'Chapters', 'MeanUser', 'Circles', 'Deliverables', 'RiskManagementTeams', 'Members', 'Comments', 'Users',
    function ($scope, $window, $stateParams, $location, Global, Events, Chapters, MeanUser, Circles, Deliverables,
              RiskManagementTeams, Members, Comments, Users) {
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
            if (deliverable.status != "Waiting on admin" &&
                deliverable.status != "Being Reviewed")
                return false;
            return MeanUser.isAdmin;
        };

        $scope.isAppAdminAndApproved = function (event, deliverable) {
            if (!event || !event.user) return false;
            if (deliverable.status != "Approved")
                return false;
            return MeanUser.isAdmin;
        };

        $scope.hostName = function () {
            var ref = $location.host()
            return (ref == 'localhost' || ref == 'grantcampanelli.com') ? ref + ':3000' : ref;
        }();

        $scope.isChapterAdmin = function (event) {
            if (!event || !event.user) return false;
            return MeanUser.user.chapter == event.chapter;
        };

        $scope.arrayChapterAdminAndNotSubmitted = function (event, deliverable) {
            if (!event || !event.user) return false;
            if (deliverable.status != "Waiting on chapter" ||
                deliverable.type != "Array")
                return false;
            return MeanUser.user.chapter == event.chapter;
        };

        $scope.fileChapterAdminAndNotSubmitted = function (event, deliverable) {
            if (!event || !event.user) return false;
            if (deliverable.status != "Waiting on chapter" ||
                deliverable.type != "File")
                return false;
            return MeanUser.user.chapter == event.chapter;
        };

        $scope.stringChapterAdminAndNotSubmitted = function (event, deliverable) {
            if (!event || !event.user) return false;
            if (deliverable.status != "Waiting on chapter" ||
                deliverable.type != "String")
                return false;
            return MeanUser.user.chapter == event.chapter;
        };

        $scope.availableCircles = [];

        $scope.getUserFromId = function (userID) {
            console.log("getuser from id: " + userID);
            Users.get({
                _id: userID

            }, function (user) {
                console.log(user);
            });
        };


        /*
         *
         * CUSTOM CODE START
         *
         */
        var userChapter;
        $scope.setupCreateEvent = function () {
            $scope.findAvailableChapters();
            if (MeanUser.getChapter)
                $scope.userChapter = MeanUser.getChapter;
            console.log($scope.userChapter);
            $scope.chapter = MeanUser.getChapter;
            $scope.getChapterExec($scope.userChapter);
        };

        $scope.chapterExec = [];
        $scope.getChapterExec = function (chapterName) {
            Users.query({}, function (users) {
                if (!chapterName)
                    $scope.chapterExec = users;
                else {
                    users.forEach(function (user) {
                        if (user.chapter == chapterName) {
                            $scope.chapterExec.push(user);
                            console.log(user)
                        }
                    });
                }

            });

            $scope.chapterExec.push(new Users({
                name: 'Other'
            }));
        };

        $scope.getPointOfContactFromEvent = function (chapter, pocuser) {
            Users.query({}, function (users) {
                users.forEach(function (user) {
                    if (user._id == pocuser) {
                        $scope.pointofcontact = user;
                        console.log(user)
                    }
                });

            });
        };

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
            var poc = $('.pointofcontactother');
            if (pointofcontact.name == 'Other') {
                poc.removeClass("ng-hide");
                poc.addClass("ng-show");
                poc.prop('required', true);
            }
            else {
                poc.removeClass("ng-show");
                poc.addClass("ng-hide");
                poc.removeAttr('required');
            }
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
                status: "Waiting on chapter",
                comments: []
            });
            event.deliverables.push(d);

            var arr = [];
            $scope.minSoberMonitors = Math.ceil(event.attendance / 30);
            console.log("This is the right number: " + $scope.minSoberMonitors);
            // Add Risk Management Team
            var rm = new RiskManagementTeams({
                position: "Sober Executive",
                member: null
            });
            arr.push(rm);
            for (var i = 0; i < $scope.minSoberMonitors; i++) {
                rm = new RiskManagementTeams({
                    position: null,
                    member: null
                });
                arr.push(rm);
            }
            d = new Deliverables({
                type: "Array",
                name: "Risk Management Team",
                status: "Waiting on chapter",
                rmArray: arr,
                comments: []
            });
            event.deliverables.push(d);

            if (event.howAlcoholProvided != "BYOB") {
                d = new Deliverables({
                    type: "File",
                    name: "Third Party Liquor License",
                    status: "Waiting on chapter",
                    comments: []
                });
                event.deliverables.push(d);
            }
            if (event.thirdPartyEventManagement == true) {
                d = new Deliverables({
                    type: "File",
                    name: "Third Party Event Management Contract",
                    status: "Waiting on chapter",
                    comments: []
                });
                event.deliverables.push(d);
            }

            if (event.transportation == true) {
                d = new Deliverables({
                    type: "File",
                    name: "Third Party Transportation Contract",
                    status: "Waiting on chapter",
                    comments: []
                });
                event.deliverables.push(d);
            }

            d = new Deliverables({
                type: "File",
                name: "Pre Event Guest List",
                status: "Waiting on chapter",
                comments: []
            });
            event.deliverables.push(d);

            d = new Deliverables({
                type: "File",
                name: "Post Event Guest List",
                status: "Waiting on chapter",
                comments: []
            });
            event.deliverables.push(d);

            d = new Deliverables({
                type: "String",
                name: "Post Event Review",
                status: "Waiting on chapter",
                comments: []
            });
            event.deliverables.push(d);

            return event;
        };

        $scope.createEvent = function (isValid) {
            if (isValid) {
                // $scope.event.permissions.push('test test');

                //$scope.generateDeliverables();
                var event = new Events($scope.event);
                event.chapter = MeanUser.getChapter;
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

        $scope.verifyRemoveEvent = function (event) {
            var deleteUser = $window.confirm('Are you sure you want to delete this event?');
            if (deleteUser) {
                $scope.removeEvent(event);
            }

        };

        $scope.updateEvent = function (isValid) {
            if (isValid) {
                var event = $scope.event;
                if (!event.updated) {
                    event.updated = [];
                }

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
        };

        $scope.riskManagement

        $scope.setupDeliverableArray = function (index) {
            $scope.findMembers();
            if ($scope.event.deliverables[index].rmArray)
                $scope.riskManagementTeam = $scope.event.deliverables[index].rmArray;
            else
                console.log("big problem in update deliverable array");
        };

        $scope.findEvents = function () {
            Events.query(function (events) {
                $scope.events = events;
            });
        };
        var pointofcontact;
        $scope.eventContentLoaded = 0;
        $scope.findOneEvent = function () {
            Events.get({
                eventId: $stateParams.eventId
            }, function (event) {
                $scope.event = event;
            });
        };

        $scope.members;

        $scope.findMembers = function () {
            if (!$scope.members) {
                $scope.members = [];
                Members.query(function (members) {
                    $scope.members = []
                    members.forEach(function (member) {
                        if (member.chapter == $scope.event.chapter)
                            $scope.members.push(member);
                    });
                });
            }
        };

        $scope.updateRMTeam = function (risk, member) {
            risk.member = new Members();

            risk.member = member;
            console.log("Updated RM?");
        };


        /* Event File Submission */

        $scope.uploadFileCallback = function (file, deliverable, event) {

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

        $scope.deliverableSubmissionData = [];

        $scope.createDeliverableSubmissionDataFromFile = function (url, filename) {
            var comment = []
            comment.fileURL = url;
            comment.fileName = filename;
            return comment;
        };

        /* Event Comment File Callback */
        $scope.commentUploadFileCallback = function (file, index) {
            $scope.deliverableSubmissionData[index] = $scope.createDeliverableSubmissionDataFromFile(file.src, file.name);

        };

        $scope.submitGeneralComment = function (index, commentString, status) {
            var event = $scope.event;
            var okayToSave = 0;
            var d = $scope.deliverableSubmissionData[index];
            var c = new Comment();

            if (d) {
                c.fileURL = d.fileURL ? d.fileURL : null;
                c.fileName = d.fileName ? d.fileName : null;
            }
            if (c) {
                c.comment = commentString ? commentString : null;
            }
            if (d || commentString != null) {
                c.user = MeanUser.user;
                c.username = c.user.name;
                if (!event.deliverables[index].comments)
                    event.deliverables[index].comments = [];
                event.deliverables[index].comments.push(c);
                event.deliverables[index].status = status;
                okayToSave = 1;
            }
            $scope.event = event;

            if (okayToSave) {
                event.$update(function () {
                    $location.path('events/' + event._id);
                }).then(function () {
                    console.log("event updated!");
                    $scope.setupViewEvent();
                });
            }
        };


        $scope.submitFileDeliverableForReview = function (index, commentString) {
            $scope.submitGeneralComment(index, commentString, "Waiting on admin");
        };

        $scope.revokeApprovalDeliverable = function(index) {
            $scope.submitGeneralComment(index, "Revoked Approval", "Waiting on admin");
        };

        $scope.adminReviewDeliverable = function (index, commentString, status) {
            var newStatus, newCommentString;

            if (status == 'deny') {
                newStatus = "Waiting on chapter";
                newCommentString = commentString ? commentString : "Denied";
            }
            else if (status == 'review') {
                newStatus = "Being Reviewed";
                newCommentString = commentString ? commentString : "Being Reviewed";
            }
            else if (status == 'approve') {
                newStatus = "Approved";
                newCommentString = commentString ? commentString : "Approved";
            }

            $scope.submitGeneralComment(index, newCommentString, newStatus);
        };

        $scope.submitStringDeliverableForReview = function (index, commentString) {
            if ($scope.event.deliverables[index].strContent != null) {
                $scope.submitGeneralComment(index, commentString, "Waiting on admin");
            }
        };

        $scope.submitArrayDeliverableForReview = function (index, commentString) {
            $scope.submitGeneralComment(index, commentString, "Waiting on admin");
        };

        $scope.uploadFinished = function (files) {
            //console.log(files);
        };

        /*
         * Risk Management
         */

        $scope.riskManagementTeamNotEditable = 1;

        $scope.rmAvailablePositions = [
            {value: 'Sober Executive', text: 'Sober Executive'},
            {value: 'Inside Sober Monitor', text: 'Inside Sober Monitor'},
            {value: 'Outside Sober Monitor', text: 'Outside Sober Monitor'},
            {value: 'Bartender', text: 'Bartender'},
            {value: 'General Sober Monitor', text: 'General Sober Monitor'}
        ];

        $scope.rmAvailablePositions = [
            'Sober Executive',
            'Inside Sober Monitor',
            'Outside Sober Monitor',
            'Bartender',
            'General Sober Monitor'
        ];

        $scope.updateRMPosition = function () {

        };

        $scope.showPosition = function (risk) {
            var selected = [];
            if (risk.position) {
                selected = $scope.rmAvailablePositions.forEach(function (r) {
                    if (r.text == risk.position) {
                        return r;
                    }
                });
            }
            return risk.position;
        };

        $scope.showMember = function (risk) {
            return risk.member;

        };

        $scope.addRisk = function (index) {
            var rm = new RiskManagementTeams({
                position: null,
                member: null
            });
            $scope.event.deliverables[index].rmArray.push(rm);
        };

        $scope.saveRiskTable = function (index) {
            var results = []
            var riskArray = $scope.event.deliverables[index].rmArray;
            var i;
            for (i = 0; i < riskArray.length; i++) {
                var risk = $scope.riskArray[i];
            }

            return $q.all(results);
        };

        $scope.updateRiskManagement = function (type, index) {
            var event = $scope.event;
            event.$update(function () {
                $location.path('events/' + event._id);
            }).then(function () {
                console.log("update risk management");
            });
            $scope.event = event;
        };

        /*
         * Deliverable Progress Bar
         */
        $scope.numDeliverablesApproved = 0;
        $scope.numDeliverablesChapter = 0;
        $scope.numDeliverablesAdmin = 0;
        $scope.numDeliverablesReviewing = 0;

        $scope.setupDeliverableProgress = function() {
            if($scope.deliverables) {
                var approved = 0, chapter = 0, admin = 0, reviewing = 0;
                $scope.deliverables.forEach(function(d) {
                    switch(d.status) {
                        case "Approved":
                            approved++;
                            break;
                        case "Waiting on chapter":
                            chapter++;
                            break;
                        case "Waiting on admin":
                            admin++;
                            break;
                        case "Being Reviewed":
                            reviewing++;
                            break;
                    }
                });
                $scope.numDeliverablesApproved = approved;
                $scope.numDeliverablesChapter = chapter;
                $scope.numDeliverablesAdmin = admin;
                $scope.numDeliverablesReviewing = reviewing;
            }
        };

        /*
         * Setting Up Viewing An Event
         */
        $scope.setupViewEvent = function () {
            Events.get({
                eventId: $stateParams.eventId
            }, function (event) {
                $scope.event = event;
                $scope.deliverables = event.deliverables;
                $scope.setupDeliverableProgress();
                $scope.pointofcontact = $scope.getPointOfContactFromEvent(event.chapter, event.pocuser);
                $scope.findMembers();
                $scope.eventContentLoaded = 1;
                console.log(event);
            });

        };


    }
]);