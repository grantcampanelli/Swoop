'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Members, app, auth, database) {

  app.get('/api/members/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/members/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/members/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });
  


  app.get('/api/members/example/render', function(req, res, next) {
    Members.render('index', {
      package: 'members'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
  
  
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
};
