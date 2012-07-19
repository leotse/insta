var util = require('util');


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