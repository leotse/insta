var util = require('util');

//////////////////////////////
// Instagram Configurations //
//////////////////////////////

exports.instagram = { };
exports.instagram.clientID = 'fe6f9c215983471cae3c86baec369e06';
exports.instagram.secret = '904f1f500dce4a94bef0a7de5dad30b0';
exports.instagram.redirectUrl = 'http://localhost:3000/login/callback';
exports.instagram.authUrlTemplate = 'https://api.instagram.com/oauth/authorize/?client_id=%s&redirect_uri=%s&response_type=code';
exports.instagram.accessTokenBodyTemplate = util.format('client_id=%s&client_secret=%s&grant_type=authorization_code&redirect_uri=%s&code=%s',
	exports.instagram.clientID, 
	exports.instagram.secret,
	exports.instagram.redirectUrl);


/////////////////////////////
// MongoLab Configurations //
/////////////////////////////

exports.mongo = { };
exports.connectionString = "mongodb://heroku_app5412164:am9u2o5394gbnqp457s80ekrk2@ds033767.mongolab.com:33767/heroku_app5412164";