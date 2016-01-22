exports.models = {

  Event: {
    id: 'Event',
    required: ['content', 'title'],
    properties: {
   
      title: {
        type: 'string',
        description: 'Title of the event'
      },
      content: {
        type: 'string',
        description: 'content of the event'
      },
      permissions: {
        type: 'Array',
        description: 'Permissions for viewing the event'
      }
    }
  }
};
