// Some test scripts for redis

var redis = require('redis')
 ,  config = require('./config').redis
 ,  client = redis.createClient(config.port, config.host);

client.auth(config.pass);
client.on('error', redis.print);


// output all content in database
client.keys('*', function(err, keys) {
  if(err) console.log(err);
  else {

    // output session values
    var i, key;
    for(i = keys.length - 1; i >= 0; i--) {
      key = keys[i];
      client.get(key, function(err, value) {
        if(err) console.log(err);
        else console.log(value);
      });
    }
  }
});


// // flush db
// client.flushdb(function(err, result) {
//   if(err) console.log(err);
//   else console.log(result);
// });