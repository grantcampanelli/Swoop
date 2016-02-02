'use strict';

angular.module('mean.members').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            //.state('members example page', {
            //    url: '/members/example',
            //    templateUrl: 'members/views/index.html'
            //})
            //.state('members allchapters', {
            //    url: '/members/allchapters',
            //    templateUrl: 'members/views/allchapters.html'
            //})
            //.state('members kappasigma', {
            //    url: '/members/kappasigma',
            //    templateUrl: 'members/views/kappasigma.html'
            //})
            //.state('members chapter1', {
            //    url: '/members/chapter1',
            //    templateUrl: '/members/views/chapter1.html'
            //    /*
            //     ,
            //     requiredCircles : {
            //     circles: ['can create content']
            //     }
            //     */
            //})
            //.state('members chapter2', {
            //    url: '/members/chapter2',
            //    templateUrl: 'members/views/chapter2.html'
            //})
            //.state('members chapter3', {
            //    url: '/members/chapter3',
            //    templateUrl: 'members/views/chapter3.html'
            //})
            //.state('members chapter4', {
            //    url: '/members/chapter4',
            //    templateUrl: 'members/views/chapter4.html'
            //})
            //.state('members chapter5', {
            //    url: '/members/chapter5',
            //    templateUrl: 'members/views/chapter5.html'
            //})
            //.state('members chapter6', {
            //    url: '/members/chapter6',
            //    templateUrl: 'members/views/chapter6.html'
            //})
            .state('all members', {
                url: '/members',
                templateUrl: '/members/views/list.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('create member', {
                url: '/members/create',
                templateUrl: '/members/views/create.html',
                requiredCircles: {
                    circles: ['can create content']
                }
            })
            .state('edit member', {
                url: '/members/:memberId/edit',
                templateUrl: '/members/views/edit.html',
                requiredCircles: {
                    circles: ['can edit content']
                }
            })
            .state('member by id', {
                url: '/members/:memberId',
                templateUrl: '/members/views/view.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })


            .state('all chapters', {
                url: '/chapters',
                templateUrl: '/members/views/all-chapters.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('create chapter', {
                url: '/chapters/create',
                templateUrl: '/members/views/create-chapter.html',
                requiredCircles: {
                    circles: ['can create content']
                }
            })
            .state('edit chapter', {
                url: '/chapters/:chapterId/edit',
                templateUrl: '/members/views/edit-chapter.html',
                requiredCircles: {
                    circles: ['can edit content']
                }
            })
            .state('chapter by id', {
                url: '/chapters/:chapterId',
                templateUrl: '/members/views/specific-chapter.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
        ;

    }
]);

