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
exports.getUser = function(token, callback) {
	var url = util.format("https://api.instagram.com/v1/users/self/?access_token=%s", token);

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


// get user's follwoing
exports.getFollowing = function(token, callback) {
	var url = util.format("https://api.instagram.com/v1/users/self/follows?access_token=%s", token);

	// make request to instagram
	request.get(url, function(err, response, body) {
		if(err) callback(err);
		else parseResponse(body, callback);
	});
};


// get a user's most recent photos
exports.getRecent = function(token, uid, options, callback) {
	var url = util.format("https://api.instagram.com/v1/users/%s/media/recent/?access_token=%s", uid, token);

	// process additional options
	if(options) {
		var count = options.count && options.count > 0 ? 
			options.count : 10; 							// return 10 by default 
		var minTime = options.minTime || null;				// no default min
		var maxTime = options.maxTime || null;				// no default max

		// update url with parameters
		if(count > 0) url = url + "&count=" + count;
		if(minTime) url = url + "&min_timestamp=" + minTime;
		if(maxTime) url = url + "&max_timestamp=" + maxTime;
	}

	// make request to instagram
	console.log(url);
	request.get(url, function(err, response, body) {
		if(err) callback(err);
		else parseResponse(body, callback);
	});
};


// get a list of user's most recent photos
exports.getRecentForUsers = function(token, uids, options, callback) {

	// input sanitization
	if(!uids || uids.length === 0) callback('invalid uids in getRecentForUsers');
	else {
		var errs = []
		 ,	results = []
		 ,	count = uids.length;

		// make getRecent call for all uids
		for(var i = uids.length - 1; i >= 0; i--) {
			exports.getRecent(token, uids[i], options, getRecentCompleted);
		}

		// getRecent callback
		function getRecentCompleted(err, recent) {
			count--;

			// keep track of any errors and results
			if(err) errs.push(err);
			else results = results.concat(recent);

			// make callback when all network calls have been completed
			if(count === 0) {
				if(errs.length === 0) errs = null;
				callback(errs, results);
			}
		}
	}
};


/////////////
// Helpers //
/////////////

// parses the response body and make callback
function parseResponse(body, callback) {

	// parse response body as json
	var json;
	try { json = JSON.parse(body); }
	catch(e) { 
		callback('instagram returned invalid json response: ' + body);
		return;
	}

	// make callback
	if(json.meta.code !== 200) callback(json.meta);
	else callback(null, json.data);
}