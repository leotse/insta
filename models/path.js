////////////////
// Path Model //
////////////////

var mongoose = require('mongoose')
 ,	config = require('../config')
 ,	Schema = mongoose.Schema;


// schema definition
var PathSchema = new Schema({
	name	: { type: String, required: true },
	uid		: { type: Schema.ObjectId, ref: 'User', required: true },
	photos	: [{ type: Schema.ObjectId, ref: 'Photo', required: true }],
}, { strict: true });


// register model with mongoose
mongoose.model('Path', PathSchema);