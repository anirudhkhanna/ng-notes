var express = require('express');
var passport = require('passport');
var jwt = require('express-jwt');
var mongoose = require('mongoose');

var User = mongoose.model('User');
var Note = mongoose.model('Note');
var Label = mongoose.model('Label');

var router = express.Router();


/* Set up auth */
var auth = jwt({
	secret: 'MY_SECRET',
	userProperty: 'payload'
});


/* API utility functions */

/* Get current date in specific format as a string */
var getCurrentDate = function() {

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var d = new Date();
	return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
};

/* Register a new user */
var register = function(req, res) {

	if(!req.body.name || !req.body.email || !req.body.password) {
		res.status(400).json({
			message: 'Please fill all the fields.'
		});
		return;
	}

	var user = new User();

	user.name = req.body.name;
	user.email = req.body.email;
	user.avatar = req.body.avatar;
	user.setPassword(req.body.password);

	user.save(function(err) {

		if(err) {
			res.status(401).json({
				message: 'This email id is already registered.'
			});
			return;
		}

		// Save some default labels
		var label = new Label();
		label.author = user._id;
		label.labels = ['Inspiration', 'Personal', 'Work', 'Miscellaneous'];
		label.save(function(err) {
			if(err) {
				res.status(401).json({
					message: 'Error while generating user labels.'
				});
				return;
			}
		});

		// Save some default notes
		var note;

		note = new Note();
		note.title = '';
		note.content = '<p>Easily identify & organize your notes with colors and labels.</p>';
		note.dateCreated = getCurrentDate();
		note.labels = ['Personal', 'Miscellaneous'];
		note.colorClass = 'color4';
		note.isArchived = false;
		note.isTrashed = false;
		note.timestamp = Math.floor(Date.now() / 1000) + 0;
		note.author = user._id;
		note.save(function(err) {
			if(err) {
				res.status(401).json({
					message: 'Error while generating user notes.'
				});
				return;
			}
		});

		note = new Note();
		note.title = 'Everything at one place';
		note.content = '<p>Find your notes from any device - laptop, tablet, smartphone.</p><p>Capture a note once, and access it from anywhere.</p>';
		note.dateCreated = getCurrentDate();
		note.labels = ['Miscellaneous'];
		note.colorClass = 'color2';
		note.isArchived = false;
		note.isTrashed = false;
		note.timestamp = Math.floor(Date.now() / 1000) + 1;
		note.author = user._id;
		note.save(function(err) {
			if(err) {
				res.status(401).json({
					message: 'Error while generating user notes.'
				});
				return;
			}
		});

		note = new Note();
		note.title = '';
		note.content = '<p>Done with a note?</p><p>Just send to the <em>archive</em>, where you can always find it later.</p>';
		note.dateCreated = getCurrentDate();
		note.labels = [];
		note.colorClass = 'color8';
		note.isArchived = false;
		note.isTrashed = false;
		note.timestamp = Math.floor(Date.now() / 1000) + 2;
		note.author = user._id;
		note.save(function(err) {
			if(err) {
				res.status(401).json({
					message: 'Error while generating user notes.'
				});
				return;
			}
		});

		note = new Note();
		note.title = 'Welcome to ng-notes';
		note.content = '<p>Capture your ideas effortlessly with NGN. <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f604.svg);">&nbsp;</span><span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f606.svg);">&nbsp;</span><br><br>To add a new note, click on the <strong>+</strong> icon below.</p>';
		note.dateCreated = getCurrentDate();
		note.labels = [];
		note.colorClass = 'color9';
		note.isArchived = false;
		note.isTrashed = false;
		note.timestamp = Math.floor(Date.now() / 1000) + 3;
		note.author = user._id;
		note.save(function(err) {
			if(err) {
				res.status(401).json({
					message: 'Error while generating user notes.'
				});
				return;
			}
		});

		// Generate a JWT for user login
		var token = user.generateJwt();
		res.status(200).json({
			token: token
		});
	});
};

/* Sign in an existing user */
var signin = function(req, res) {

	if(!req.body.email || !req.body.password) {
		res.status(400).json({
			message: 'Please fill all the fields.'
		});
		return;
	}

	passport.authenticate('local', function(err, user, info) {

		var token;

		// If Passport throws/catches an error
		if(err) {
			res.status(404).json(err);
			return;
		}
		// If a user is found
		if(user) {
			token = user.generateJwt();
			res.status(200).json({
				token: token
			});
		}
		// Otherwise user is not found
		else {
			res.status(401).json(info);
		}
	})(req, res);
};

/* Get user profile */
var getUser = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	User.findById(req.payload._id).exec(function(err, user) {
		if(err)
			res.status(401).json(err);
		else if(user === null)
			res.status(401).json({
				message: 'User not found.'
			});
		else
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				avatar: user.avatar
			});
	});
};

/* Update user profile */
var updateUser = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	var user = req.body;
	var query = {_id: user._id};
	delete user._id;
	delete user.__v;
	User.findOneAndUpdate(query, user, {upsert: true}).exec(function(err, user) {
		if(err) {
			if(err.message.indexOf('E11000') !== -1)
				res.status(401).json({
					message: 'This email id is already registered.'
				});
			else
				res.status(401).json(err);
		}
		else
			res.status(200).json(user);
	});
};

/* Change user password */
var changeUserPassword = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	User.findById(req.payload._id).exec(function(err, user) {
		if(err) {
			res.status(401).json(err);
			return;
		}

		if(!user.validPassword(req.body.oldPassword)) {
			res.status(401).json({
				message: 'The password is wrong. Try again.'
			});
			return;
		}

		user.setPassword(req.body.newPassword);
		var query = {_id: user._id};
		var changedUser = {};
		changedUser.name = user.name;
		changedUser.email = user.email;
		changedUser.avatar = user.avatar;
		changedUser.hash = user.hash;
		changedUser.salt = user.salt;
		User.findOneAndUpdate(query, changedUser, {upsert: true}).exec(function(err, user) {
			if(err)
				res.status(401).json(err);
			else
				res.status(200).json(user);
		});
	});
};

/* Delete user */
var deleteUser = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	User.findById(req.payload._id).exec(function(err, user) {
		if(err) {
			res.status(401).json(err);
			return;
		}

		if(!user.validPassword(req.params.password)) {
			res.status(401).json({
				message: 'The password is wrong. Try again.'
			});
			return;
		}

		// Delete user labels
		var query = {author: user._id};
		Label.remove(query).exec(function(err, labels) {
			if(err) {
				res.status(401).json({
					message: 'Error while removing user labels.'
				});
				return;
			}
		});

		// Delete user notes
		query = {author: user._id};
		Note.remove(query).exec(function(err, notes) {
			if(err) {
				res.status(401).json({
					message: 'Error while removing user notes.'
				});
				return;
			}
		});

		// Delete user account
		query = {_id: user._id};
		User.remove(query).exec(function(err, user) {
			if(err) {
				res.status(401).json({
					message: 'Error while removing user account.'
				});
				return;
			}
		});

		res.status(200).json(user);
	});
};

/* Get user labels */
var getLabels = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	var query = {author: req.payload._id};
	Label.findOne(query).exec(function(err, labels) {
		if(err)
			res.status(401).json(err);
		else
			res.status(200).json(labels);
	});
};

/* Add a user label */
var addLabel = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	var label = req.params.label;
	var query = {author: req.payload._id};
	Label.findOneAndUpdate(query, {$push: {labels: label}}).exec(function(err, labels) {
		if(err)
			res.status(401).json(err);
		else
			res.status(200).json(labels);
	});
};

/* Delete a user label */
var deleteLabel = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	var label = req.params.label;
	var query = {author: req.payload._id};
	Label.findOneAndUpdate(query, {$pullAll: {labels: [label]}}).exec(function(err, labels) {
		if(err)
			res.status(401).json(err);
		else
			res.status(200).json(labels);
	});
};

/* Get user notes */
var getNotes = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	var query = {author: req.payload._id};
	Note.find(query).exec(function(err, notes) {
		if(err)
			res.status(401).json(err);
		else
			res.status(200).json(notes);
	});
};

/* Add a user note */
var addNote = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	var newNote = req.body;
	newNote.author = req.payload._id;
	var note = new Note(newNote);
	note.save(function(err) {
		if(err)
			res.status(401).json(err);
		else
			res.status(200).json(note);
	});
};

/* Update a user note */
var updateNote = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	var note = req.body;
	var query = {_id: note._id};
	delete note._id;
	delete note.__v;
	Note.findOneAndUpdate(query, note, {upsert: true}).exec(function(err, note) {
		if(err)
			res.status(401).json(err);
		else
			res.status(200).json(note);
	});
};

/* Delete a user note */
var deleteNote = function(req, res) {

	if(!req.payload._id) {
		res.status(401).json({
			message: 'UnauthorizedError: Private profile.'
		});
		return;
	}

	var query = {_id: req.params.id};
	Note.remove(query).exec(function(err, result) {
		if(err)
			res.status(401).json(err);
		else
			res.status(200).json(result);
	});
};


/* Configure API routes using the API functions */
router.post('/register', register);
router.post('/signin', signin);

router.get('/getuser', auth, getUser);
router.put('/updateuser', auth, updateUser);
router.put('/changeuserpassword', auth, changeUserPassword);
router.delete('/deleteuser/:password', auth, deleteUser);

router.get('/getlabels', auth, getLabels);
router.get('/addlabel/:label', auth, addLabel);
router.delete('/deletelabel/:label', auth, deleteLabel);

router.get('/getnotes', auth, getNotes);
router.post('/addnote', auth, addNote);
router.put('/updatenote', auth, updateNote);
router.delete('/deletenote/:id', auth, deleteNote);


module.exports = router;
