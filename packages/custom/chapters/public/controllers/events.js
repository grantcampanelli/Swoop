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

        $scope.chapterNames = [];

        $scope.findAvailableChapters = function () {
            Chapters.query(function (chapters) {
                chapters.forEach(function (chapter) {
                    $scope.chapterNames.push(chapter.name);
                })
                $scope.chapterNames.sort();
            });
        };

        //$scope.availableChapters = ['Kappa Sigma', 'Alpha Chi Omega'];

        $scope.availablePointOfContacts = ['President', 'Social Chair', 'Risk Manager', 'Other'];

        $scope.availableStartTimes = ['9:00am', '9:15am', '9:30am', '9:45am', '10:00am'];

        $scope.availableEndTimes = ['9:00am', '9:15am', '9:30am', '9:45am', '10:00am'];

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
            });
        };
    }
]);