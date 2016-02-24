'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Chapter = mongoose.model('Chapter'),
    Member = mongoose.model('Member'),
    Event = mongoose.model('Event'),
    GradeAverage = mongoose.model('GradeAverage'),
//Grades = mongoose.model('Grades')
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
        },

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

        /*
         *
         * EVENTS--------
         *
         */
        /**
         * Find event by id
         */
        event: function (req, res, next, id) {
            Event.load(id, function (err, event) {
                if (err) return next(err);
                if (!event) return next(new Error('Failed to load event ' + id));
                req.event = event;
                next();
            });
        },
        /**
         * Create an event
         */
        createEvent: function (req, res) {
            var event = new Event(req.body);
            event.user = req.user;
            event.permissions.push('authenticated');

            event.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the event'
                    });
                }

                Chapters.events.publish({
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
        updateEvent: function (req, res) {
            var event = req.event;

            event = _.extend(event, req.body);


            event.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the event'
                    });
                }

                Chapters.events.publish({
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
        destroyEvent: function (req, res) {
            var event = req.event;


            event.remove(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the event'
                    });
                }

                Chapters.events.publish({
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
        showEvent: function (req, res) {

            Chapters.events.publish({
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
        allEvents: function (req, res) {
            var query = req.acl.query('Event');

            query.find({}).sort('-created').populate('user', 'name username').exec(function (err, events) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the events'
                    });
                }

                res.json(events)
            });

        },

        /*
         *
         * Grade Averages--------
         *
         */
        /**
         * Find gradeaverages by id
         */
        gradeAverage: function (req, res, next, id) {
            GradeAverage.load(id, function (err, gradeaverage) {
                if (err) return next(err);
                if (!gradeaverage) return next(new Error('Failed to load gradeaverage ' + id));
                req.gradeaverage = gradeaverage;
                next();
            });
        },
        /**
         * Create an gradeAverage
         */
        createGradeAverage: function (req, res) {
            console.log("in create grade average");
            var gradeaverage = new GradeAverage(req.body);
            gradeaverage.user = req.user;
            //gradeaverage.permissions.push('authenticated');
            console.log(gradeaverage);

            gradeaverage.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the grade average'
                    });
                }

                Chapters.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/gradeaverages/' + gradeaverage._id,
                    name: gradeaverage.gradeQuarter + gradeaverage.gradeYear
                });

                res.json(gradeaverage);
            });
        },
        /**
         * Update a gradeaverage
         */
        updateGradeAverage: function (req, res) {
            var gradeaverage = req.gradeaverage;

            gradeaverage = _.extend(gradeaverage, req.body);


            gradeaverage.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the grade average'
                    });
                }

                Chapters.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: gradeaverage.gradeQuarter + gradeaverage.gradeYear,
                    url: config.hostname + '/gradeaverages/' + gradeaverage._id
                });

                res.json(gradeaverage);
            });
        },
        /**
         * Delete one gradeaverage
         */
        destroyGradeAverage: function (req, res) {
            var gradeaverage = req.gradeaverage;


            gradeaverage.remove(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the grade average'
                    });
                }

                Chapters.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: gradeaverage.gradeQuarter + gradeaverage.gradeYear
                });

                res.json(gradeaverage);
            });
        },
        /**
         * Show a grade average
         */
        showGradeAverage: function (req, res) {

            Chapters.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.gradeaverage.gradeQuarter + req.gradeaverage.gradeYear,
                url: config.hostname + '/gradeaverages/' + req.gradeaverage._id
            });

            res.json(req.gradeaverage);
        },
        /**
         * List of Grade Averages
         */
        allGradeAverages: function (req, res) {
            var query = req.acl.query('GradeAverage');

            query.find({}).sort('-created').populate('user', 'name username').exec(function (err, gradeaverages) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the grade averages'
                    });
                }

                res.json(gradeaverages)
            });

        },

        /*
         *
         * Deliverables -------
         *
         */
        /**
         * Find deliverables by id
         */
        deliverable: function (req, res, next, id) {
            Deliverable.load(id, function (err, deliverable) {
                if (err) return next(err);
                if (!deliverable) return next(new Error('Failed to load deliverable ' + id));
                req.deliverable = deliverable;
                next();
            });
        },
        /**
         * Create an deliverable
         */
        createDeliverable: function (req, res) {
            console.log("in create grade average");
            var deliverable = new Deliverable(req.body);
            deliverable.user = req.user;
            //deliverable.permissions.push('authenticated');
            console.log(deliverable);

            deliverable.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the grade average'
                    });
                }

                Chapters.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/deliverables/' + deliverable._id,
                    name: deliverable.name
                });

                res.json(deliverable);
            });
        },
        /**
         * Update a deliverable
         */
        updateDeliverable: function (req, res) {
            var deliverable = req.deliverable;

            deliverable = _.extend(deliverable, req.body);


            deliverable.save(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the grade average'
                    });
                }

                Chapters.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: deliverable.name,
                    url: config.hostname + '/deliverables/' + deliverable._id
                });

                res.json(deliverable);
            });
        },
        /**
         * Delete one deliverable
         */
        destroyDeliverable: function (req, res) {
            var deliverable = req.deliverable;


            deliverable.remove(function (err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the grade average'
                    });
                }

                Chapters.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: deliverable.name
                });

                res.json(deliverable);
            });
        },
        /**
         * Show a grade average
         */
        showDeliverable: function (req, res) {

            Chapters.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.deliverable.name,
                url: config.hostname + '/deliverables/' + req.deliverable._id
            });

            res.json(req.deliverable);
        },
        /**
         * List of Grade Averages
         */
        allDeliverables: function (req, res) {
            var query = req.acl.query('Deliverable');

            query.find({}).sort('-created').populate('user', 'name username').exec(function (err, deliverables) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the grade averages'
                    });
                }

                res.json(deliverables)
            });

        },

        /**
         * RISK MANAGEMENT TEAM
         */
        riskmanagementteam: function (req, res, next, id) {
            RiskManagementTeams.load(id, function (err, riskmanagementteam) {
                if (err) return next(err);
                if (!riskmanagementteam) return next(new Error('Failed to load deliverable ' + id));
                req.riskmanagementteam = riskmanagementteam;
                next();
            });
        },



    };
}