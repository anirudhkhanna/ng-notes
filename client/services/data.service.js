var app = angular.module('notesApp');

/* User data service */
app.service('data', function($http, authentication) {

	var getUser = function() {
		return $http.get('/api/getuser', {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var updateUser = function(user) {
		return $http.put('/api/updateuser', user, {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var changeUserPassword = function(changePassword) {
		return $http.put('/api/changeuserpassword', changePassword, {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var removeUser = function(password) {
		return $http.delete('/api/deleteuser/' + password, {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var getLabels = function() {
		return $http.get('/api/getlabels', {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var addLabel = function(label) {
		return $http.get('/api/addlabel/' + label, {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var removeLabel = function(label) {
		return $http.delete('/api/deletelabel/' + label, {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var getNotes = function() {
		return $http.get('/api/getnotes', {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var addNote = function(note) {
		return $http.post('/api/addnote', note, {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var updateNote = function(note) {
		return $http.put('/api/updatenote', note, {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	var updateNoteContent = function(note) {
		return $http.put('/api/updatenote', note, {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			},
			ignoreLoadingBar: true
		});
	};

	var removeNote = function(note) {
		return $http.delete('/api/deletenote/' + note._id, {
			headers: {
				Authorization: 'Bearer ' + authentication.getToken()
			}
		});
	};

	return {
		getUser: getUser,
		updateUser: updateUser,
		changeUserPassword: changeUserPassword,
		removeUser: removeUser,
		getLabels: getLabels,
		addLabel: addLabel,
		removeLabel: removeLabel,
		getNotes: getNotes,
		addNote: addNote,
		updateNote: updateNote,
		updateNoteContent: updateNoteContent,
		removeNote: removeNote
	};
});
