'use strict';

angular.module('mean.chapters').controller('EventsController', ['$scope', '$stateParams', '$location', 'Global', 'Events', 'Chapters', 'MeanUser', 'Circles',
    function ($scope, $stateParams, $location, Global, Events, Chapters, MeanUser, Circles) {
        $scope.global = Global;

        $scope.hasAuthorization = function (event) {
            if (!event || !event.user) return false;
            return MeanUser.isAdmin || event.user._id === MeanUser.user._id;
        };

        $scope.availableCircles = [];

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

        $scope.riskManagementDocumentRequired = 1;

        $scope.riskManagementTeamRequired = 1;

        $scope.postGuestListRequired = 1;

        $scope.thirdPartyEventManagementContractRequired = 1;

        $scope.riskManagementTeamPositions = function () {
            var array = [];
            array.push({'title': 'Inside 1', 'name': 'Grant Campanelli'});
            array.push({'title': 'Inside 2', 'name': 'Grant Campanelli'});
            array.push({'title': 'Inside 3', 'name': 'Grant Campanelli'});
            array.push({'title': 'Inside 4', 'name': 'Grant Campanelli'});
            return array;
        }();


        $scope.chapterNames = [];

        $scope.findAvailableChapters = function () {
            Chapters.query(function (chapters) {
                chapters.forEach(function (chapter) {
                    $scope.chapterNames.push(chapter.name);
                })
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

        $scope.createEvent = function (isValid) {
            if (isValid) {
                // $scope.event.permissions.push('test test');
                var event = new Events($scope.event);

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
                event.updated.push(new Date().getTime());

                event.$update(function () {
                    $location.path('events/' + event._id);
                });
            } else {
                $scope.submitted = true;
            }
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
                console.log('eventID' + $stateParams.eventId);
                console.log(event);
            });
        };


    }
]);