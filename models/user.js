////////////////
// User Model //
////////////////

var mongoose = require('mongoose')
 ,	config = require('../config')
 ,	Schema = mongoose.Schema;


// schema definition
var UserSchema = new Schema({
	id			: { type: String, required: true, unique: true }	
 ,	username	: { type: String, required: true, unique: true }
 ,	name		: { type: String, required: true, index: true }
 ,	picture 	: { type: String, required: true }
 ,	token		: { type: String, required: true }
 ,	joined		: { type: Date, default: Date.now }
 ,	profile		: { }
}, { strict: true });

UserSchema.statics.findByInstagramId = function(id, callback) {
	return this.findOne({ 'id': id }, callback);
};

// register model with mongoose
mongoose.model('User', UserSchema);