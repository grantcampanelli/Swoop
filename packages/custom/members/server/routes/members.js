//'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
//module.exports = function(Members, app, auth, database) {
//
//  app.get('/api/members/example/anyone', function(req, res, next) {
//    res.send('Anyone can access this');
//  });
//
//  app.get('/api/members/example/auth', auth.requiresLogin, function(req, res, next) {
//    res.send('Only authenticated users can access this');
//  });
//
//  app.get('/api/members/example/admin', auth.requiresAdmin, function(req, res, next) {
//    res.send('Only users with Admin role can access this');
//  });
//  
//
//
//  app.get('/api/members/example/render', function(req, res, next) {
//    Members.render('index', {
//      package: 'members'
//    }, function(err, html) {
//      //Rendering a view from the Package server/views
//      res.send(html);
//    });
//  });
  
  
/*
  app.get('/api/members/chapter1/render', function(req, res, next) {
    Members.render('chapter1', {
      package: 'members'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
*/
//};

'use strict';

// Member authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.member.user._id.equals(req.user._id)) {
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

module.exports = function(Members, app, auth) {

  var members = require('../controllers/members')(Members);

  app.route('/api/members')
      .get(members.all)
      .post(auth.requiresLogin, hasPermissions, members.create);
  app.route('/api/members/:memberId')
      .get(auth.isMongoId, members.show)
      .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, members.update)
      .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, members.destroy);

  // Finish with setting up the memberId param
  app.param('memberId', members.member);
};
