'use strict';

// Event authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.event.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        }
    }

    next();
};

module.exports = function(Events, app, auth) {
  
  var events = require('../controllers/events')(Events);

  app.route('/api/events')
    .get(events.all)
    .post(auth.requiresLogin, hasPermissions, events.create);
  app.route('/api/events/:eventId')
    .get(auth.isMongoId, events.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, events.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, events.destroy);

  // Finish with setting up the eventId param
  app.param('eventId', events.event);
};
