// Dependencies

var util = require('util');
var request = require('request');
var config = require('../config');


/*
 * GET home page
 */

exports.index = function(req, res){
  res.render('index', { title: 'insta' });
};

/*
 * GET login page
 */
 exports.login = function(req, res) {
 	var url = util.format(config.instagram.authUrlTemplate, config.instagram.clientID, config.instagram.redirectUrl);
 	res.redirect(url);
 };

 /*
  * GET access code callback
  */
exports.getCode = function(req, res) {
	var code = req.query.code;

	// if query string 'code' is present, then this is the first callback when instagram sends the code
	// use the code to exchange for an access token
	if(!code) res.send('error: expecting code'); 
	else {
		request.post({
			url: config.instagram.accesTokenUrl,
			body: util.format(config.instagram.accessTokenBodyTemplate, code)
		}, function(error, response, body) {
			if(error) res.send('error: unable to retrieve access token');
			else {
				var result = JSON.parse(body);
				if(result.error_type) res.send(util.format('%s: %s', result.error_type, result.error_message));
				else {
					res.render('success', { title: 'insta', token: result.access_token, user: result.user });
				}
			}
		});
	}
};
