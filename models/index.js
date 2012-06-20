
////////////
// Models //
////////////

var config = require('../config')
, 	mongoose = require('mongoose');

// initialize database connection
mongoose.connect(config.connectionString);
mongoose.connection.on('open', function(err, db) {
	if(err) console.log(err);
});

// initialize models
require('./user');

// exports
exports.User = mongoose.model('User');