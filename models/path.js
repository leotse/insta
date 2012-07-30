////////////////
// Path Model //
////////////////

var mongoose = require('mongoose')
 ,	config = require('../config')
 ,	Schema = mongoose.Schema;


// schema definition
var PathSchema = new Schema({
	title			: { type: String, required: true },
	description		: { type: String },
	uid				: { type: Schema.ObjectId, ref: 'User', required: true },
	start			: { type: Date, default: Date.now },
	end				: { type: Date, default: Date.now },
	collaborators	: [ { type: String, required: true } ],
	photos			: [ { type: Schema.ObjectId, ref: 'Photo', required: true } ],
}, { strict: true });


// register model with mongoose
mongoose.model('Path', PathSchema);