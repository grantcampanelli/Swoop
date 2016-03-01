'use strict';

//var Members = require('members.js');

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    chapter: {
        type: String,
        trim: true
    },
    calpolyemail: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    college: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        trim: true
    },
    abroadcoop: {
        type: String,
        trim: true
    },
    pellgrant: {
        type: String,
        trim: true
    },
    leadership: {
        type: String,
        trim: true
    },
    birthday: {
        type: String,
        trim: true
    },
    year: {
        type: String,
        trim: true
    },
    permissions: {
        type: Array
    },
    updated: {
        type: Array
    }
});


/**
 * Statics
 */
MemberSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Member', MemberSchema);

var StringSubmissionSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    content: String,
    comment: String
});

var ArraySubmissionSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    content: Array,
    comment: String
});

var FileSubmissionSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    //content: File,
    comment: String
});

mongoose.model('StringSubmissions', StringSubmissionSchema);
mongoose.model('ArraySubmissions', ArraySubmissionSchema);
mongoose.model('FileSubmissions', FileSubmissionSchema);

var RiskManagementTeamSchema = new Schema({
    position: String,
    member: MemberSchema
});

mongoose.model('RiskManagementTeams', RiskManagementTeamSchema);


var CommentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    strContent: String,
    arrContent: Array,
    fileURL: String,
    comment: String
});

//mongoose.model('CommentSubmission', CommentSubmissionSchema);
/**
 * Deliverable Schema
 */
var DeliverableSchema = new Schema({
    type: String,
    name: String,
    permissions: Array,
    status: String,
    updated: Array,
    strContent: String,
    arrContent: Array,
    rmArray: [RiskManagementTeamSchema],
    fileContent: String,
    //fs : [FileSubmissionSchema],
    comments: [CommentSchema]
    //as: [ArraySubmissionSchema],
    //ss: [StringSubmissionSchema]
});


//mongoose.model('Deliverables', DeliverableSchema);


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
        type: Boolean
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
    },
    deliverables: [DeliverableSchema]
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
