'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MemberSchema = new Schema({
   firstName: {
      type: String,
      trim: true
   },
   lastName: {
      type: String,
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
   major: {
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
