'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Event Schema
 */
var EventSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    chapter: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    pointofcontact: {
        type: String,
        trim: true
    },
    contactName: {
        type: String,
        trim: true
    },
    contactEmail: {
        type: String,
        trim: true
    },
    contactPhone: {
        type: String,
        trim: true
    },
    date: {
        type: Date
    },
    starttime: {
        type: String
    },
    endtime: {
        type: String
    },
    address: {
        type: String
    },
    eventType: {
        type: String
    },
    coHosts: {
        type: Array
    },
    thirdPartyEventManagement: {
        type: Boolean
    },
    attendance: {
        type: Number
    },
    alcoholPresent: {
        type: Boolean
    },
    verifyDrinkingAgeID: {
        type: Array
    },
    verifyAgeWhileServing: {
        type: String
    },
    howAlcoholProvided: {
        type: String
    },
    transportation: {
        type: String
    },
    security: {
        type: Boolean
    },
    entertainmentServices: {
        type: Boolean
    },
    awareOfLaws: {
        type: Boolean
    },
    confirmAccuracy: {
        type: Boolean
    },
    confAddRequirements: {
        type: Boolean
    },
    permissions: {
        type: Array
    },
    updated: {
        type: Array
    },
    riskManagementPlan: {
        type: String
    },
    riskManagementTeam: {
        type: Array
    }
});

/**
 * Validations
 */
EventSchema.path('title').validate(function (title) {
    return !!title;
}, 'Title cannot be blank');

EventSchema.path('content').validate(function (content) {
    return !!content;
}, 'Content cannot be blank');

/**
 * Statics
 */
EventSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Event', EventSchema);
