var util = require('util');


////////////////////////////
// MongoDB Configurations //
////////////////////////////

exports.connectionString = "mongodb://nodejitsu:4ae98d019df4bec809372cb9c51675eb@linus.mongohq.com:10075"


//////////////////////////
// Redis Configurations //
//////////////////////////

exports.redis = { };
exports.redis.connectionString = "redis://nodejitsu:f327cfe980c971946e80b8e975fbebb4@nodejitsudb4430928423.redis.irstack.com:6379";
exports.redis.host = "nodejitsudb4430928423.redis.irstack.com";
exports.redis.port = "6379";
exports.redis.pass = "f327cfe980c971946e80b8e975fbebb4";


//////////////////////////////////////////
// Environment Dependant Configurations //
//////////////////////////////////////////

if(process.env.PORT) {
	exports.instagram = require('./prod');
} else {
	exports.instagram = require('./dev');
}