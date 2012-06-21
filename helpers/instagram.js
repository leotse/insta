///////////////////////////
// Instagram API Helpers //
///////////////////////////

var util = require('util')
 ,	request = require('request')
 ,	config = require('../config').instagram;


// get an access code
exports.getToken = function(code, callback) {
	var url = "https://api.instagram.com/oauth/access_token";
	var body = util.format("client_id=%s&client_secret=%s&grant_type=authorization_code&redirect_uri=%s&code=%s"
		,	config.clientID
		,	config.secret
		,	config.redirectUrl
		, 	code
	);

	// make post request to retrieve code
	request.post({ 'url': url, 'body': body }, function(err, res, body) {
		if(err) callback(err);
		else {

			// parse body and return token
			var json = JSON.parse(body);
			callback(null, json);
		}
	});
};


// get detailed user profile
exports.getUser = function(id, token, callback) {
	var url = util.format("https://api.instagram.com/v1/users/%s/?access_token=%s", id, token);

	// retrieve detail user profile
	request.get(url, function(err, response, body) {
		if(err) callback(err);
		else parseResponse(body, callback);
	});
};


// get user's feed
exports.getFeed = function(token, callback) {
	var url = util.format("https://api.instagram.com/v1/users/self/feed?access_token=%s", token);

	// retrieve current user's feed
	request.get(url, function(err, response, body) {
		if(err) callback(err);
		else parseResponse(body, callback);
	});
};


/////////////
// Helpers //
/////////////

// parses the response body and make callback
function parseResponse(body, callback) {

	// parse response body as json
	var json = JSON.parse(body);

	// make callback
	if(json.meta.code !== 200) callback(json.meta);
	else callback(null, json.data);
}