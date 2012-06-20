var util = require('util')
 ,	request = require('request')
 ,	config = require('../config');


// GET /
exports.index = function(req, res){
	res.render('index', { title: 'insta' });
};


// GET /login
exports.login = function(req, res) {
	var url = util.format(config.instagram.authUrlTemplate, config.instagram.clientID, config.instagram.redirectUrl);
	res.redirect(url);
};

// more routes
exports.auth = require('./auth');