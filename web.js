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


////////////
// Routes //
////////////

// authentication
app.get('/login', routes.auth.login);
app.get('/login/callback', routes.auth.getCode);
app.get('/logout', routes.auth.logout);

// paths pages
app.get('/paths', routes.paths.list);
app.get('/paths/:id', routes.paths.show);
app.get('/paths/:id/edit', routes.paths.edit);

// paths api
app.post('/paths', routes.paths.create);
app.post('/paths/:id', routes.paths.update);
app.delete('/paths/:id', routes.paths.destroy);

// dashboard
app.get('/home', routes.home);

// static pages
app.get('/', routes.index);


//////////////////
// Start Server //
//////////////////

var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("insta server listening on port %d in %s mode", app.address().port, app.settings.env);
});