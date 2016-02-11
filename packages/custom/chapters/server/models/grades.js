//'use strict';
//
///**
// * Module dependencies.
// */
//var mongoose = require('mongoose'),
//    Schema = mongoose.Schema;

/**
 * Grades Schema
 */
//var GradesSchema = new Schema({
//    created: {
//        type: Date,
//        default: Date.now
//    },
//    quarter: {
//        type: String,
//        required: true,
//        trim: true
//    },
//    year: {
//        type: String,
//        required: true,
//        trim: true
//    },
//    chapter: {
//        type: String,
//        required: true,
//        trim: true
//    },
//    gpa: {
//        type: String,
//        required: true,
//        trim: true
//    },
//    user: {
//        type: Schema.ObjectId,
//        ref: 'User',
//        required: true
//    },
//    permissions: {
//        type: Array
//    },
//    updated: {
//        type: Array
//    }
//});


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
//GradesSchema.statics.load = function(id, cb) {
//    this.findOne({
//        _id: id
//    }).populate('user', 'name username').exec(cb);
//};
//
//mongoose.model('Grades', GradesSchema);
