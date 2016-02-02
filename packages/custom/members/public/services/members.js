'use strict';

//angular.module('mean.members').factory('Members', [
//  function() {
//    return {
//      name: 'members'
//    };
//  }
//]);

angular.module('mean.members').factory('Members', ['$resource',
  function($resource) {
    return $resource('api/members/:memberId', {
      memberId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
