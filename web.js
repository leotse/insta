//////////////////
// insta Server //
//////////////////

var express = require('express')
  , routes = require('./routes')
  , config = require('./config')
  , RedisStore = require('connect-redis')(express);

var app = module.exports = express.createServer();


///////////////////
// Configuration //
///////////////////

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ 
    secret: 'pqlFNkq74RGxmjfJYIhwmw==',
    store: new RedisStore({ 'host': config.redis.host, 'port': config.redis.port, 'pass': config.redis.pass }),
    cookie: { maxAge: 3600000 }
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


///////////
// Pages //
///////////

// authentication
app.get('/login', routes.web.auth.login);
app.get('/login/callback', routes.web.auth.getCode);
app.get('/logout', routes.web.auth.logout);

// subscription
app.get('/subscription', routes.web.subscription.verify);
app.post('/subscription', routes.web.subscription.callback);

// paths pages
app.get('/paths', routes.web.paths.list);
app.get('/paths/:id', routes.web.paths.show);
app.get('/paths/:id/edit', routes.web.paths.edit);

// paths 
app.post('/paths', routes.web.paths.create);
app.post('/paths/:id', routes.web.paths.update);
app.delete('/paths/:id', routes.web.paths.destroy);

// dashboard
app.get('/home', routes.web.home);

// static pages
app.get('/', routes.web.index);


/////////
// API //
/////////

app.get('/api/paths', routes.api.paths.list);
app.get('/api/paths/:id', routes.api.paths.details);


//////////////////
// Start Server //
//////////////////

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("insta server listening on port %d in %s mode", app.address().port, app.settings.env);
});




// // subscribe for instagram notification
// var util = require('util')
//  ,  request = require('request')
//  ,  config = require('./config').instagram

// var url = util.format(
//   'https://api.instagram.com/v1/subscriptions/?client_id=%s&client_secret=%s&verify_token=%s',
//   config.clientID, 
//   config.secret
// );

// var body = util.format(
//   'callback_url=%s&aspect=media&object=user&verify_token=%s',
//   'http://insta.dyndns-server.com/subscription',
//   'whatisthistokenforanyway'
// );

// request.post({ 'url': url, 'body': body }, function(err, res, body) {
//   console.log(body);
// });