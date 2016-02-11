'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var personSchema = Schema({
//    _id     : Number,
//    name    : String,
//    age     : Number,
//    stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
//});
//
//var storySchema = Schema({
//    _creator : { type: Number, ref: 'Person' },
//    title    : String,
//    fans     : [{ type: Number, ref: 'Person' }]
//});

/*
 * Chapter Grade Schema
 */
//var ChapterGPA = Schema({
//    chapterName : String,
//    gpa  : Number
//});

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
        trim: true
    },
    year: {
        type: Number
    },
    calpolymensgpa: {
        type: Number
    },
    calpolywomensgpa: {
        type: Number
    },
    ifcgpa: {
        type: Number
    },
    phagpa: {
        type: Number
    },
    usfcgpa: {
        type: Number
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
    },
    alphachiomega: Number,
    alphaepsilonphi: Number,
    alphaepsilonpi: Number,
    alphagammadelta: Number,
    alphagammarho: Number,
    alphaomicronpi: Number,
    alphaphi: Number,
    betathetapi: Number,
    chiomega: Number,
    deltachi: Number,
    deltataudelta: Number,
    deltaupsilon: Number,
    gammaphibeta: Number,
    kappaalphatheta: Number,
    kappakappagamma: Number,
    kappasigma: Number,
    lambdachialpha: Number,
    nualphakappa: Number,
    phikappapsi: Number,
    sigmakappa: Number,
    sigmanu: Number,
    sigmapi: Number,
    taukappaepsilon: Number,
    thetachi: Number,
    zetabetatau: Number
});


/**
 * Validations
 */
//EventSchema.path('name').validate(function(name) {
//    return !!name;
//}, 'name cannot be blank');
//
//EventSchema.path('content').validate(function(content) {
//    return !!content;
//}, 'Content cannot be blank');

/**
 * Statics
 */
GradeAverageSchema.statics.load = function (id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

//ChapterGPA.statics.load = function(id, cb) {
//    this.findOne({
//        _id: id
//    }).populate('user', 'name username').exec(cb);
//};

mongoose.model('GradeAverage', GradeAverageSchema);
//mongoose.model('ChapterGPA', ChapterGPA);