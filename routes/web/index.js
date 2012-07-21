var helpers = require('../../helpers');


// GET /
exports.index = function(req, res){

	// see if user is logged in
	var authenticated = !!req.session.uid;

	res.render('index', {
		'title': 'insta',
		'authenticated': authenticated
	});
};


// GET /home
exports.home = function(req, res) {

	// get token for logged in user
	var token = req.session.token;

	if(!token) res.redirect('/login');
	else {
		instagram.getFeed(token, function(err, feed) {
			if(err) helpers.sendError(res, err);
			else res.render('home', { 
				'title': 'home',
				'feed': feed
			});
		});
	}
};


exports.auth = require('./auth');
exports.paths = require('./paths');
exports.subscription = require('./subscription');