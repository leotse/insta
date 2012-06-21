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
		instagram.getFeed('6243303.8ac8b61.f1fc6d6424b74618b90c4d752c3ba1a9', function(err, feed) {
			if(err) helpers.sendError(res, err);
			else res.render('home', { 'title': 'feed', 'feed': feed });
		});
	}
};


// more routes
exports.auth = require('./auth');