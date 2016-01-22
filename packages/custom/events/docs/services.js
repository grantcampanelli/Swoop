'use strict';

exports.load = function(swagger, parms) {

  var searchParms = parms.searchableOptions;

  var list = {
    'spec': {
      description: 'Event operations',
      path: '/events',
      method: 'GET',
      summary: 'Get all Events',
      notes: '',
      type: 'Event',
      nickname: 'getEvents',
      produces: ['application/json'],
      params: searchParms
    }
  };

  var create = {
    'spec': {
      description: 'Device operations',
      path: '/events',
      method: 'POST',
      summary: 'Create event',
      notes: '',
      type: 'Event',
      nickname: 'createEvent',
      produces: ['application/json'],
      parameters: [{
        name: 'body',
        description: 'Event to create.  User will be inferred by the authenticated user.',
        required: true,
        type: 'Event',
        paramType: 'body',
        allowMultiple: false
      }]
    }
  };

  swagger.addGet(list)
    .addPost(create);

};
