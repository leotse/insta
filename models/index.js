
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
require('./path');
require('./photo');

// exports
exports.User = mongoose.model('User');
exports.Path = mongoose.model('Path');
exports.Photo = mongoose.model('Photo');