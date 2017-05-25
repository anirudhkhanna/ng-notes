var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({usernameField: 'email'},
	function(username, password, done) {
		User.findOne({email: username}, function(err, user) {
			if(err) {
				return done(err);
			}
			// If the user not found in database
			if(!user) {
				return done(null, false, {
					message: 'This email is not recognized.'
				});
			}
			// If the password is wrong
			if(!user.validPassword(password)) {
				return done(null, false, {
					message: 'The password is wrong. Try again.'
				});
			}
			// If the credentials are correct, return the user object
			return done(null, user);
		});
	})
);
