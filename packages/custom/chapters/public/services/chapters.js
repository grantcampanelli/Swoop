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