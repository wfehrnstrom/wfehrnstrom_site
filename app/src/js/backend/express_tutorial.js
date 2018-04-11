var express = require('express');
var app = express();

// specify callback function that will be invoked whenever HTTP GET request with path /
// to site root.
// req: request object
// res: response object
app.get('/', function(req, res){
  res.send('Hello World!');
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000!');
});

// assume this code is in "module" with filename square.js
// to make objects available outside of module, assign them to exports object
exports.area = function(width) {return width* width};
exports.perimeter = function(width){ return 4*width};

// don't need to specify .js file extension for require statement
var square = require('./square');

// what about exporting a complete object?
module.exports = {
  area: function(width) {
    return width * width;
  },
  perimeter: function(width) {
    return 4 * width;
  }
};

// call method in response to any HTTP method
// next is next handler to execute
app.all('/secret', function(res, req, next){
  console.log('SECRET ACCESS');
  next();
});

// Routers
// wiki.js - Wiki Route Module
var express = require('express');
var router = express.Router();

// home page route
router.get('/', function(req, res){
  res.send('Home page!');
});

// About page route
router.get('/about', function(req, res){
  res.send('About this wiki');
});

module.exports = router;

// to use router in main app
var wiki = require('./wiki-js');
// ....
app.use('/wiki', wiki);

// MIDDLEWARE FUNCTIONS SHOULD CALL NEXT REQUEST HANDLER WITH NEXT() OR REQUEST WILL BE LEFT HANGING
// MIDDLEWARE AND ROUTING FUNCTIONS ARE CALLED IN THE ORDER THEY ARE DEFINED

var a_middleware_function = function(req, res, next) {
  // some functionality
  next();
}

// function added with use for all routes and verbs
app.use(a_middleware_function);

// function added with use for a specific route
app.use('/someroute', a_middleware_function);

// function added for specific HTTP verb and route
app.get('/someroute', a_middleware_function);

app.listen(3000);

// express.static middleware serves files

// serve files from a directory named public
app.use(express.static('public'));

// add prefix to the path on which we serve static files
app.use('/prefix_path', express.static('public'));

// errors can be handled by middleware functions that have 4 arguments instead of 3, with the error param specified first
// error handlers must be called after all other app.use() so that they are the last functions called in the request handling process
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send("Something's wrong");
});
