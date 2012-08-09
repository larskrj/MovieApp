
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.set("view options", { layout: false });
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Seed database
require("./seedDatabase").seedIfEmpty();

// Routes
require("./routes/api/movies")(app);
require("./routes/api/movieImages")(app);
require("./routes/index")(app);

console.log("Express server listening on port %d in %s mode", process.env.port || 3000, app.settings.env);

app.listen(process.env.port || 3000);


