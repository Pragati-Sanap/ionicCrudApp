var mongoose = require('mongoose');
var mongooseTimestamp = require("mongoose-timestamp");
var Schema = mongoose.Schema;


var classroom = new Schema({
    class_name:String,
    students:[{student_name:String}],

});
classroom.plugin(mongooseTimestamp);
mongoose.model('classroom', classroom);
module.exports = mongoose.model('classroom',classroom);