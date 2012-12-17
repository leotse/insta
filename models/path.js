////////////////
// Path Model //
////////////////

var mongoose = require('mongoose')
 ,	config = require('../config')
 ,	Schema = mongoose.Schema;


// schema definition
var PathSchema = new Schema({
	uid				: { type: Schema.ObjectId, ref: 'User', required: true },
	title			: { type: String, required: true },
	description		: { type: String },
	start			: { type: Date, default: Date.now },
	end				: { type: Date, default: Date.now },
	tags			: [ { type: String, index: true } ],
	collaborators	: [ { type: String, index: true } ],
	photos			: [ { type: Schema.ObjectId, ref: 'Photo', required: true } ],
}, { strict: true });


// register model with mongoose
mongoose.model('Path', PathSchema);