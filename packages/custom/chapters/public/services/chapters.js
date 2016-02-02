'use strict';

//angular.module('mean.chapters').factory('Chapters', [
//  function() {
//    return {
//      name: 'chapters'
//    };
//  }
//]);

angular.module('mean.chapters').factory('Chapters', ['$resource',
    function($resource) {
        return $resource('api/chapters/:chapterId', {
            chapterId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
