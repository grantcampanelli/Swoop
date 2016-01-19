var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   chapter: String,
   birthday: String,
   year: String
});

mongoose.model('Member', MemberSchema);