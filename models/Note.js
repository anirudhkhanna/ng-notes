var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
	title: {
		type: String
	},
	content: {
		type: String
	},
	dateCreated: {
		type: String
	},
	labels: {
		type: [String]
	},
	colorClass: {
		type: String
	},
	isArchived: {
		type: Boolean
	},
	isTrashed: {
		type: Boolean
	},
	timestamp: {
		type: Number
	},
	author: {
		type: String
	}
});

mongoose.model('Note', noteSchema);
