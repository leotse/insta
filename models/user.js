////////////////
// User Model //
////////////////

var mongoose = require('mongoose');
 ,	Schema = mongoose.Schema


var UserSchema = new Schema({
	name		: { type: String, required: true }
 ,	instaId		: { type: String, required: true }
 ,	token		: { type: String, required: true }
 ,	joined		: { type: Date, default: Date.now }
});