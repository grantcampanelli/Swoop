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
        .post(auth.requiresLogin, chapters.create);
    app.route('/api/chapters/:chapterId')
        .get(auth.isMongoId, chapters.show)
        .put(auth.isMongoId, auth.requiresLogin, chapters.update)
        .delete(auth.isMongoId, auth.requiresLogin, chapters.destroy);

    // Finish with setting up the chapterId param
    app.param('chapterId', chapters.chapter);

    app.route('/api/members')
        .get(chapters.allMembers)
        .post(auth.requiresLogin, chapters.createMember);
    app.route('/api/members/:memberId')
        .get(chapters.showMember)
        .put(auth.isMongoId, auth.requiresLogin, chapters.updateMember)
        .delete(auth.isMongoId, auth.requiresLogin, chapters.destroyMember);

    // Finish with setting up the memberId param
    app.param('memberId', chapters.member);

    /* Events */

    app.route('/api/events')
        .get(chapters.allEvents)
        .post(auth.requiresLogin, chapters.createEvent);
    app.route('/api/events/:eventId')
        .get(auth.isMongoId, chapters.showEvent)
        .put(auth.isMongoId, auth.requiresLogin, chapters.updateEvent)
        .delete(auth.isMongoId, auth.requiresLogin, chapters.destroyEvent);

    // Finish with setting up the eventId param
    app.param('eventId', chapters.event);


    ///* Chapter Grades */
    //app.route('/api/grades')
    //    .get(chapters.allGrades)
    //    .post(auth.requiresLogin, chapters.createGrades);
    //app.route('/api/grades/:gradesId')
    //    .get(auth.isMongoId, chapters.showGrades)
    //    .put(auth.isMongoId, auth.requiresLogin, chapters.updateGrades)
    //    .delete(auth.isMongoId, auth.requiresLogin, chapters.destroyGrades);
    //
    //// Finish with setting up the gradesId param
    //app.param('gradesId', chapters.grades);

    /* Greek Grades */
    app.route('/api/gradeaverages')
        .get(chapters.allGradeAverages)
        .post(auth.requiresLogin, chapters.createGradeAverage);
    app.route('/api/gradeaverages/:gradeaverageId')
        .get(auth.isMongoId, chapters.showGradeAverage)
        .put(auth.isMongoId, auth.requiresLogin, chapters.updateGradeAverage)
        .delete(auth.isMongoId, auth.requiresLogin, chapters.destroyGradeAverage);

    // Finish with setting up the gradesId param
    app.param('gradeaverageId', chapters.gradeAverage);

    app.route('/api/deliverables')
        .get(chapters.allDeliverables)
        .post(auth.requiresLogin, chapters.createDeliverable);
    app.route('/api/deliverables/:deliverableId')
        .get(auth.isMongoId, chapters.showDeliverable)
        .put(auth.isMongoId, auth.requiresLogin, chapters.updateDeliverable)
        .delete(auth.isMongoId, auth.requiresLogin, chapters.destroyDeliverable);

    // Finish with setting up the gradesId param
    app.param('deliverableId', chapters.deliverable);

    app.route('/api/comments')
        .get(chapters.allComments)
        .post(auth.requiresLogin, chapters.createComment);
    app.route('/api/comments/:commentId')
        .get(auth.isMongoId, chapters.showComment)
        .put(auth.isMongoId, auth.requiresLogin, chapters.updateComment)
        .delete(auth.isMongoId, auth.requiresLogin, chapters.destroyComment);

    // Finish with setting up the gradesId param
    app.param('commentId', chapters.deliverable);

    // Finish with setting up the gradesId param
    app.param('riskmanagementteamId', chapters.riskmanagementteam);

};
