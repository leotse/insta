var util = require('util')
 ,	request = require('request')
 ,	config = require('../config')
 ,	helpers = require('../helpers')
 ,	instagram = helpers.instagram
 ,	Models = require('../models')
 ,	User = Models.User;


 // GET /login
exports.login = function(req, res) {
	var token = req.session.token;

	// if user is already authenticated, go to home page
	if(token) res.redirect('/home');
	else {

		// user token not found, redirect user to instagram login
		var url = util.format(config.instagram.authUrlTemplate, config.instagram.clientID, config.instagram.redirectUrl);
		res.redirect(url);
	}
};


// GET /login/callback
exports.getCode = function(req, res) {
	var code = req.query.code;

	// if query string 'code' is present, then this is the first callback when instagram sends the code
	// use the code to exchange for an access token
	if(!code) error(res, 'error: expecting code');
	else {
		instagram.getToken(code, function(err, tokenRes) {
			if(err) error(res, 'error: unable to retrieve access token');
			else if(tokenRes.error_type) error(res, tokenRes);
			else {

				var user = tokenRes.user;
				var token = tokenRes.access_token;

				// get detailed user profile data
				helpers.instagram.getUser(user.id, token, function(err, profile) {
					if(err) error(res, err);
					else {

						// check if the user is already in our database
						User.findByInstagramId(user.id, function(err, dbUser) {
							if(err) error(res, err);
							else if(dbUser) {

								// user is already in db
								// instead of creating a new user we want to update the existing one
								dbUser.id = profile.id;
								dbUser.username = profile.username;
								dbUser.name = profile.full_name;
								dbUser.picture = profile.profile_picture;
								dbUser.token = token;
								dbUser.profile = profile;
								dbUser.save(function(err, saved) {
									if(err) helpes.sendError(res, err);
									else success(req, res, saved);
								});

							} else {

								// this is a new user save the instagram user to db
								var dbUser = new User();
								dbUser.id = profile.id;
								dbUser.username = profile.username;
								dbUser.name = profile.full_name;
								dbUser.picture = profile.profile_picture;
								dbUser.token = token;
								dbUser.profile = profile;
								dbUser.save(function(err, saved) {
									if(err) error(res, err);
									else success(req, res, user);
								});
							}
						});
					}
				});
			}
		});
	}
};


/////////////
// Helpers //
/////////////

function success(req, res, user) {

	// create session
	req.session.userId = user._id;
	req.session.token = user.token;

	// redirect user to home page after login
	res.redirect('/home');
}

function error(res, err) {
	helpers.sendError(res, err);
}