/////////////////
// Photo Model //
/////////////////

var mongoose = require('mongoose')
 ,	config = require('../config')
 ,	Schema = mongoose.Schema;


// schema definition
var PhotoSchema = new Schema({
	uid		: { type: Schema.ObjectId, required: true, ref: 'User' },
	data	: { }
}, { strict: true });


// register model with mongoose
mongoose.model('Photo', PhotoSchema);