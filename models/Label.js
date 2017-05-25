var mongoose = require('mongoose');

var labelSchema = mongoose.Schema({
	author: {
		type: String
	},
	labels: [{
		type: String
	}]
});

mongoose.model('Label', labelSchema);
