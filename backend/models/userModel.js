var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'username' : { type: String, unique: true },
	'password' : { type: String },
	'role' : { type: String, enum: ['user', 'admin'] },
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
