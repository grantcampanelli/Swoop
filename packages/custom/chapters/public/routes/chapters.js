'use strict';

angular.module('mean.chapters').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('all chapters', {
                url: '/chapters',
                templateUrl: '/chapters/views/list-chapters.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('create chapter', {
                url: '/chapters/create',
                templateUrl: '/chapters/views/create-chapter.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
                //{
                //    circles: ['can create content'],
                //    denyState: 'auth.login'
                //}
            })
            .state('edit chapter', {
                url: '/chapters/:chapterId/edit',
                templateUrl: '/chapters/views/edit-chapter.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
                //{
                //    circles: ['can edit content']
                //}
            })
            .state('chapter by id', {
                url: '/chapters/:chapterId',
                templateUrl: '/chapters/views/view-chapter.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('all members', {
                url: '/members',
                templateUrl: '/chapters/views/list-members.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('create member', {
                url: '/members/create',
                templateUrl: '/chapters/views/create-member.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
                //{
                //    circles: ['can create content'],
                //    denyState: 'auth.login'
                //}
            })
            .state('edit member', {
                url: '/members/:memberId/edit',
                templateUrl: '/chapters/views/edit-member.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
                //{
                //    circles: ['can edit content'],
                //    denyState: 'auth.login'
                //}
            })
            .state('member by id', {
                url: '/members/:memberId',
                templateUrl: '/chapters/views/view-member.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('all events', {
                url: '/events',
                templateUrl: '/chapters/views/list-events.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('create event', {
                url: '/events/create',
                templateUrl: '/chapters/views/create-event.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
                //{
                //    circles: ['can create content']
                //}
            })
            .state('edit event', {
                url: '/events/:eventId/edit',
                templateUrl: '/chapters/views/edit-event.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                    //}
                    //{
                    //    circles: ['can edit content']
                    //}
            })
            .state('event by id', {
                url: '/events/:eventId',
                templateUrl: '/chapters/views/view-event.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })

        ;

    }
]);

