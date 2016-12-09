'use strict';

var app = require('express')();
var path = require('path');
var User = require('../api/users/user.model');
var session = require('express-session');
// var bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(require('./logging.middleware'));
app.use(require('./request-state.middleware'));
app.use(session({
  // this mandatory configuration ensures that session IDs are not predictable
  secret: 'tongiscool' // or whatever you like
}));
app.use(require('./statics.middleware'));

app.use('/', function(req, res, next){
	console.log(req.session.userId);
	next();
})

app.use('/api', require('../api/api.router'));

app.use('/api', function (req, res, next) {
	// console.log(req.body);
  if (!req.session.counter) req.session.counter = 0;
  // console.log('counter', ++req.session.counter);
  console.log(req.session);
  next();
});

app.post('/login', function (req, res, next) {
  User.findOne({
    where: req.body
  })
  .then(function (user) {
  	console.log(user);
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      console.log(user.id);
      res.sendStatus(204);
    }
  })
  .catch(next);
});

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];

var indexPath = path.join(__dirname, '..', '..', 'browser', 'index.html');

validFrontendRoutes.forEach(function (stateRoute) {
  // console.log('INDEXPATH', indexPath)

  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
