// test code to debug redis session
// keep here for now
var redis = require('redis')
 ,  config = require('./config').redis
 ,  client = redis.createClient(config.port, config.host);

client.auth(config.pass);
client.on('error', redis.print);

client.keys('*', function(err, keys) {
  if(err) console.log(err);
  else {

    // output session values
    var i, key;
    for(i = keys.length; i >= 0; i--) {
      key = keys[i];
      client.get(key, function(err, value) {
        if(err) console.log(err);
        else console.log(value);
      });
    }
  }
});