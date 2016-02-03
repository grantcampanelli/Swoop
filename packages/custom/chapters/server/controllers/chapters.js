'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Chapter = mongoose.model('Chapter'),
    Member = mongoose.model('Member'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function (Chapters) {

    return {
        /**
         * Find chapter by id
         */
        chapter: function (req, res, next, id) {
            Chapter.load(id, function (err, chapter) {
                if (err) return next(err);
                if (!chapter) return next(new Error('Failed to load chapter ' + id));
                req.chapter = chapter;
                next();
            });
        },
        /**
         * Create an chapter
         */
        create: function (req, res) {
            var chapter = new Chapter(req.body);
            chapter.user = req.user;

            chapter.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the chapter'
                    });
                }

                Chapters.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/chapters/' + chapter._id,
                    name: chapter.name
                });

                res.json(chapter);
            });
        },
        /**
         * Update an chapter
         */
        update: function (req, res) {
            var chapter = req.chapter;

            chapter = _.extend(chapter, req.body);


            chapter.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the chapter'
                    });
                }

                Chapters.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: chapter.name,
                    url: config.hostname + '/chapters/' + chapter._id
                });

                res.json(chapter);
            });
        },
        /**
         * Delete an chapter
         */
        destroy: function (req, res) {
            var chapter = req.chapter;


            chapter.remove(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the chapter'
                    });
                }

                Chapters.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: req.chapter.name
                });

                res.json(chapter);
            });
        },
        /**
         * Show an chapter
         */
        show: function (req, res) {

            Chapters.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.chapter.name,
                url: config.hostname + '/chapters/' + req.chapter._id
            });

            res.json(req.chapter);
        },
        /**
         * List of Chapters
         */
        all: function (req, res) {
            var query = req.acl.query('Chapter');

            query.find({}).sort('-created').populate('user', 'name username').exec(function (err, chapters) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the chapters'
                    });
                }

                res.json(chapters)
            });
        },


        /*
         * Members!
         */
        /**
         * Find member by id
         */
        member: function (req, res, next, id) {
            Member.load(id, function (err, member) {
                if (err) return next(err);
                if (!member) return next(new Error('Failed to load member ' + id));
                req.member = member;
                next();
            });
        },
        /**
         * Create an member
         */
        createMember: function (req, res) {
            var member = new Member(req.body);
            member.user = req.user;

            member.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the member'
                    });
                }

                Chapters.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/members/' + member._id,
                    name: member.firstName + member.lastName
                });

                res.json(member);
            });
        },
        /**
         * Update a member
         */
        updateMember: function (req, res) {
            var member = req.member;

            member = _.extend(member, req.body);


            member.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the member'
                    });
                }

                Chapters.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: member.firstName + member.lastName,
                    url: config.hostname + '/members/' + member._id
                });

                res.json(member);
            });
        },
        /**
         * Delete a member
         */
        destroyMember: function (req, res) {
            var member = req.member;


            member.remove(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the member'
                    });
                }

                Chapters.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: member.firstName + member.lastName
                });

                res.json(member);
            });
        },
        /**
         * Show a member
         */
        showMember: function (req, res) {

            Chapters.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.member.firstName + req.member.lastName,
                url: config.hostname + '/members/' + req.member._id
            });

            res.json(req.member);
        },
        /**
         * List of members
         */
        allMembers: function (req, res) {
            var query = req.acl.query('Member');

            query.find({}).sort('-created').populate('user', 'name username').exec(function (err, members) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the members'
                    });
                }

                res.json(members)
            });
        }

        /**
         * List of all members
         */
        //allMembers: function (req, res) {
        //    var query = req.acl.query('Member');
        //
        //    query.find({}).sort('-created').populate('user', 'name username').exec(function (err, members) {
        //        if (err) {
        //            return res.status(500).json({
        //                error: 'Cannot list the chapters'
        //            });
        //        }
        //
        //        res.json(members)
        //    });
        //}
    };
}