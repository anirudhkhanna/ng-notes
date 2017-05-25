/* There are some modifications to the default Express setup.
   Each one is marked with a comment starting as [SH] to make them easy to find.
*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// [SH] Require Passport
var passport = require('passport');

// [SH] Bring in the data model
require('./config/db');

// [SH] Bring in the Passport config after the model is defined
require('./config/passport');

// [SH] Bring in the routes for the API (override the default routes)
var apiRoutes = require('./routes/api-routes');

var app = express();

// Place favicon at the proper position in client directory
app.use(favicon(__dirname + '/client/assets/favicon/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// [SH] Set the client folder to serve static resources
app.use(express.static(path.join(__dirname, 'client')));

// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
app.use('/api', apiRoutes);

// [SH] Otherwise render the index.html page for the Angular SPA
// [SH] This means we don't have to map all of the SPA routes in Express
app.use(function(req, res) {
	res.sendFile(path.join(__dirname, 'client', 'index.html'));
});


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});


// Error handlers

// [SH] Catch unauthorised errors
app.use(function(err, req, res, next) {
	if(err.name === 'UnauthorizedError') {
		res.status(401);
		res.json({message: err.name + ': ' + err.message});
	}
});

// Development error handler
// Will print stacktrace
if(app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


module.exports = app;
