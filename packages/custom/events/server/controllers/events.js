'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Events) {

    return {
        /**
         * Find event by id
         */
        event: function(req, res, next, id) {
            Event.load(id, function(err, event) {
                if (err) return next(err);
                if (!event) return next(new Error('Failed to load event ' + id));
                req.event = event;
                next();
            });
        },
        /**
         * Create an event
         */
        create: function(req, res) {
            var event = new Event(req.body);
            event.user = req.user;

            event.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the event'
                    });
                }

                Events.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/events/' + event._id,
                    name: event.title
                });

                res.json(event);
            });
        },
        /**
         * Update an event
         */
        update: function(req, res) {
            var event = req.event;

            event = _.extend(event, req.body);


            event.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the event'
                    });
                }

                Events.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: event.title,
                    url: config.hostname + '/events/' + event._id
                });

                res.json(event);
            });
        },
        /**
         * Delete an event
         */
        destroy: function(req, res) {
            var event = req.event;


            event.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the event'
                    });
                }

                Events.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: event.title
                });

                res.json(event);
            });
        },
        /**
         * Show an event
         */
        show: function(req, res) {

            Events.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.event.title,
                url: config.hostname + '/events/' + req.event._id
            });

            res.json(req.event);
        },
        /**
         * List of Events
         */
        all: function(req, res) {
            var query = req.acl.query('Event');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, events) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the events'
                    });
                }

                res.json(events)
            });

        }
    };
}