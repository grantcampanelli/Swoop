'use strict';

// The Package is past automatically as first parameter
module.exports = function(Chapter, app, auth, database) {

  app.get('/chapter/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/chapter/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/chapter/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/chapter/example/render', function(req, res, next) {
    Chapter.render('index', {
      package: 'chapter'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
