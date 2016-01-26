'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Chapter Schema
 */
var ChapterSchema = new Schema({
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
    permissions: {
        type: Array
    },
    updated: {
        type: Array
    }
});

/**
 * Grade Average Schema
 */
var GradeAverageSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    quarter: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    calpolymensgpa: {
        type: String,
        required: true,
        trim: true
    },
    calpolywomensgpa: {
        type: String,
        required: true,
        trim: true
    },
    ifcgpa: {
        type: String,
        required: true,
        trim: true
    },
    phagpa: {
        type: String,
        required: true,
        trim: true
    },
    usfcgpa: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    permissions: {
        type: Array
    },
    updated: {
        type: Array
    }
});

/**
 * Grade Schema
 */
var GradeSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    quarter: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        trim: true
    },
    chapter: {
        type: String,
        required: true,
        trim: true
    },
    gpa: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    permissions: {
        type: Array
    },
    updated: {
        type: Array
    }
});

/**
 * Validations
 */
//EventSchema.path('title').validate(function(title) {
//    return !!title;
//}, 'Title cannot be blank');
//
//EventSchema.path('content').validate(function(content) {
//    return !!content;
//}, 'Content cannot be blank');

/**
 * Statics
 */
//EventSchema.statics.load = function(id, cb) {
//    this.findOne({
//        _id: id
//    }).populate('user', 'name username').exec(cb);
//};

mongoose.model('Chapter', ChapterSchema);
mongoose.model('Grade', GradeSchema);
mongoose.model('GradeAverage', GradeAverageSchema);
