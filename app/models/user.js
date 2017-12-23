var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    companies: [{name : String }]
});

mongoose.model('User', UserSchema);