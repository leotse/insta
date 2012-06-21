var util = require('util')
 ,	request = require('request')
 ,	config = require('../config')
 ,	helpers = require('../helpers')
 ,	instagram = helpers.instagram;


// GET /
exports.index = function(req, res){
	res.render('index', { title: 'insta' });
};


// GET /home
exports.home = function(req, res) {

	// get token for logged in user
	var token = req.session.token;

	if(!token) res.redirect('/login');
	else {
		instagram.getFeed(token, function(err, feed) {
			if(err) helpers.sendError(res, err);
			else res.render('home', { 'title': 'feed', 'feed': feed });
		});
	}
};


// more routes
exports.auth = require('./auth');