'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Chapter = mongoose.model('Chapter'),
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
                    name: chapter.title
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
                    name: chapter.title,
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
                    name: req.chapter.title
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
                name: req.chapter.title,
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

        }
    };
}