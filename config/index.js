var util = require('util');

//////////////////////////////
// Instagram Configurations //
//////////////////////////////

exports.instagram = { };
exports.instagram.clientID = 'fe6f9c215983471cae3c86baec369e06';
exports.instagram.secret = '904f1f500dce4a94bef0a7de5dad30b0';
exports.instagram.redirectUrl = 'http://evening-sword-8581.herokuapp.com/login/callback';
exports.instagram.authUrlTemplate = 'https://api.instagram.com/oauth/authorize/?client_id=%s&redirect_uri=%s&response_type=code';


/////////////////////////////
// MongoLab Configurations //
/////////////////////////////

exports.mongo = { };
exports.connectionString = "mongodb://heroku_app5412164:am9u2o5394gbnqp457s80ekrk2@ds033767.mongolab.com:33767/heroku_app5412164";


//////////////////////////
// Redis Configurations //
//////////////////////////

exports.redis = { };
exports.redis.connectionString = "redis://redistogo:fc323487049761f58df30e64f5e8321c@koi.redistogo.com:9283/";
exports.redis.host = "koi.redistogo.com";
exports.redis.port = "9283";
exports.redis.pass = "fc323487049761f58df30e64f5e8321c";


//////////////////////////////////////////
// Environment Dependant Configurations //
//////////////////////////////////////////

if(process.env.PORT) {
	exports.instagram = require('./prod');
} else {
	exports.instagram = require('./dev');
}