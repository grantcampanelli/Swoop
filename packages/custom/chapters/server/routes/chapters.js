'use strict';

// Chapter authorization helpers
var hasAuthorization = function(req, res, next) {
    if (!req.user.isAdmin && !req.chapter.user._id.equals(req.user._id)) {
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

module.exports = function(Chapters, app, auth) {

    var chapters = require('../controllers/chapters')(Chapters);

    app.route('/api/chapters')
        .get(chapters.all)
        .post(auth.requiresLogin, hasPermissions, chapters.create);
    app.route('/api/chapters/:chapterId')
        .get(auth.isMongoId, chapters.show)
        .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, chapters.update)
        .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, chapters.destroy);

    // Finish with setting up the chapterId param
    app.param('chapterId', chapters.chapter);

    app.route('/api/members')
        .get(chapters.allMembers)
        .post(chapters.createMember);
    app.route('/api/members/:memberId')
        .get(chapters.showMember)
        .put(chapters.updateMember)
        .delete(chapters.destroyMember);

    // Finish with setting up the memberId param
    app.param('memberId', chapters.member);

};
