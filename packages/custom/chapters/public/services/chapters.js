'use strict';

//angular.module('mean.chapters').factory('Chapters', [
//  function() {
//    return {
//      name: 'chapters'
//    };
//  }
//]);

angular.module('mean.chapters').factory('Chapters', ['$resource',
    function ($resource) {
        return $resource('api/chapters/:chapterId', {
            chapterId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
angular.module('mean.chapters').factory('Members', ['$resource',
    function ($resource) {
        return $resource('api/members/:memberId', {
            memberId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('mean.chapters').factory('Events', ['$resource',
    function ($resource) {
        return $resource('api/events/:eventId', {
            eventId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('mean.chapters').factory('GradeAverages', ['$resource',
    function ($resource) {
        return $resource('api/gradeaverages/:gradeaverageId', {
            gradeaverageId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);

angular.module('mean.chapters').factory('Deliverables', ['$resource',
    function ($resource) {
        return $resource('api/deliverables/:deliverableId', {
            deliverableId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);


angular.module('mean.chapters').factory('RiskManagementTeams', ['$resource',
    function ($resource) {
        return $resource('api/riskmanagementteams/:riskmanagementteamId', {
            deliverableId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);