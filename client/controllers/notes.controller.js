var app = angular.module('notesApp');

/* Notes controller */
app.controller('notesController', function($scope, $state, authentication, data) {

	/* Color classes for notes */
	$scope.colorClasses = [
		'color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10'
	];

	/* Labels for notes */
	$scope.labels = [
		// user labels will be loaded from the database
	];

	/* Selected labels (notes with these labels are shown) */
	$scope.selectedLabels = [
		// initially empty (all notes are shown)
	];

	/* Notes of the user */
	$scope.notes = [
		// user notes will be loaded from the database
	];

	/* Dummy note object */
	$scope.note = {
		title: '',
		content: '',
		dateCreated: '',
		labels: [],
		colorClass: '',
		isArchived: false,
		isTrashed: false,
		timestamp: 0,
		author: ''
	};

	/* Currently edited note (the note being edited, which is to be updated) */
	$scope.currentNote = null;

	/* Max length of note title */
	$scope.titleMaxLength = 100;

	/* Max length of label name */
	$scope.labelMaxLength = 20;


	/* Options for Froala Editor */
	$scope.froalaOptions = {
		heightMin: 300,
		heightMax: 375,
		zIndex: 9000,
		multiLine: true,
		placeholderText: 'Take a note...',
		charCounterCount: false,
		toolbarInline: false,
		toolbarButtons: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', '|', 'color', 'emoticons', 'insertLink', 'insertImage', 'insertFile', 'html'],
		toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', '|', 'color', 'emoticons', 'insertLink', 'insertImage', 'insertFile', 'html'],
		toolbarButtonsSM: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', '|', 'color', 'emoticons', 'insertLink', 'insertImage', 'insertFile', 'html'],
		toolbarButtonsXS: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', '|', 'color', 'emoticons', 'insertLink', 'insertImage', 'insertFile', 'html'],
		tooltips: true,
		spellcheck: true,
		tabSpaces: 4,
		theme: 'gray',
		immediateAngularModelUpdate: true,
	};


	/* Get details of the current user */
	$scope.currentUser = {};
	$scope.isLoggedIn = authentication.isLoggedIn();
	data.getUser()
		.success(function(data) {
			$scope.currentUser = data;
			$scope.currentUser.avatar = 'assets/images/' + $scope.currentUser.avatar;
		})
		.error(function(err) {
			alertToast('An error occurred while loading user details. ' + err.message);
			if(err.message.indexOf('not found') !== -1)
				$scope.signout();
		});


	/* Get labels for notes */
	data.getLabels()
		.success(function(data) {
			$scope.labels = data.labels;

			var isMobile = window.matchMedia('only screen and (max-width: 800px)');	// rebind the event to automatically close the sidebar when user selects a sidebar link on small devices
			if(isMobile.matches) {
				setTimeout(function() {
					$('.sidebar-container a').on('click', function() {
						$('.sidebar-container').removeClass('sidebar-toggled');
						$('.swipe-listener').removeClass('swipe-toggled');
					});
				}, 1000);
			}

			$(document).ready(function() {
				setRippleEffects();	// reapply the ripple effects
			});
		})
		.error(function(err) {
			alertToast('An error occurred while loading labels. ' + err.message);
		});


	/* Get notes of the user */
	data.getNotes()
		.success(function(data) {
			$scope.notes = data.sort(reverseCompareTimestamps);
		})
		.error(function(err) {
			alertToast('An error occurred while loading notes. ' + err.message);
		});


	/* Make copy of a note */
	$scope.copyNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		// Make a new note object as the copy
		var newNote = {};

		newNote.title = note.title;
		newNote.content = note.content;
		newNote.dateCreated = getCurrentDate();
		newNote.labels = note.labels.slice();	// make a copy of the labels array, not just a reference to the same one
		newNote.colorClass = note.colorClass;
		newNote.isArchived = note.isArchived;
		newNote.isTrashed = note.isTrashed;
		newNote.timestamp = Math.floor(Date.now() / 1000);

		// Prepend the new note in the notes array
		$scope.notes.unshift(newNote);

		// Add the new note to the database and reload all the notes
		data.addNote(newNote);

		setTimeout(function() {
			data.getNotes()
				.success(function(data) {
					$scope.notes = data.sort(reverseCompareTimestamps);
				})
				.error(function(err) {
					alertToast('An error occurred while loading notes. ' + err.message);
				});
		}, 300);
	};


	/* Archive a note */
	$scope.archiveNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		note.isArchived = true;

		data.updateNote(note);
	};

	/* Archive a note via a modal - only after the modal has closed */
	$scope.archiveNoteViaModal = function(note, $index) {

		$('#note-view-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.archiveNote(note);
			$scope.$apply();
		});

		$('#note-edit-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.archiveNote(note);
			$scope.$apply();
		});
	};

	/* Unarchive a note */
	$scope.unarchiveNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		note.isArchived = false;

		data.updateNote(note);
	};

	/* Unarchive a note via a modal - only after the modal has closed */
	$scope.unarchiveNoteViaModal = function(note, $index) {

		$('#note-view-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.unarchiveNote(note);
			$scope.$apply();
		});

		$('#note-edit-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.unarchiveNote(note);
			$scope.$apply();
		});
	};


	/* Trash a note */
	$scope.trashNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		note.isTrashed = true;

		data.updateNote(note);
	};

	/* Trash a note via a modal - only after the modal has closed */
	$scope.trashNoteViaModal = function(note, $index) {

		$('#note-view-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.trashNote(note);
			$scope.$apply();
		});

		$('#note-edit-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.trashNote(note);
			$scope.$apply();
		});
	};

	/* Untrash a note */
	$scope.untrashNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		note.isTrashed = false;

		data.updateNote(note);
	};

	/* Untrash a note via a modal - only after the modal has closed */
	$scope.untrashNoteViaModal = function(note, $index) {

		$('#note-view-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.untrashNote(note);
			$scope.$apply();
		});

		$('#note-edit-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.untrashNote(note);
			$scope.$apply();
		});
	};


	/* Permanently remove a note from notes */
	$scope.permanentlyRemoveNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes.splice(index, 1);

		data.removeNote(note);
	};

	/* Permanently remove a note via a modal - only after the modal has closed */
	$scope.permanentlyRemoveNoteViaModal = function(note, $index) {

		$('#note-view-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.permanentlyRemoveNote(note);
			$scope.$apply();
		});

		$('#note-edit-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.permanentlyRemoveNote(note);
			$scope.$apply();
		});
	};


	/* Create a new note and add to notes */
	$scope.createNote = function() {

		// Clear the search string and reset the state to main notes state
		$scope.searchString = '';
		$state.go('notes.state-notes');

		// Make a new note
		var newNote = {};

		newNote.title = '';
		newNote.content = '';
		newNote.dateCreated = getCurrentDate();
		newNote.labels = [];
		newNote.colorClass = $scope.colorClasses[8];
		newNote.isArchived = false;
		newNote.isTrashed = false;
		newNote.timestamp = Math.floor(Date.now() / 1000);

		// Prepend the new note in the notes array
		$scope.notes.unshift(newNote);

		// Add the new note to the database and reload all the notes, also open the edit modal for the new note
		data.addNote(newNote);

		setTimeout(function() {
			data.getNotes()
				.success(function(data) {
					$scope.notes = data.sort(reverseCompareTimestamps);
					// Open the edit modal for the new note and also set it as the current note
					setTimeout(function() {
						$('#note-edit-modal-0').modal('show');
						$scope.currentNote = $scope.notes[0];
					}, 30);
				})
				.error(function(err) {
					alertToast('An error occurred while loading notes. ' + err.message);
				});
		}, 300);
	};


	/* Set the color of a note */
	$scope.setNoteColor = function(note, colorClass) {

		if(note === null || colorClass === null || typeof note !== 'object' || typeof colorClass !== 'string')
			return;

		note.colorClass = colorClass;

		data.updateNote(note);
	};


	/* Check for a label in the given note */
	$scope.checkNoteLabel = function(note, label) {

		return note.labels.indexOf(label) != -1;
	};

	/* Change note label - add or remove the given label */
	$scope.changeNoteLabel = function(note, label) {

		if(note === null || label === null || typeof note !== 'object' || typeof label !== 'string')
			return;

		var index = note.labels.indexOf(label);
		if(index == -1)
			note.labels.push(label);
		else
			note.labels.splice(index, 1);

		data.updateNote(note);
	};

	/* Change note label via labels page - close the modal first if the current label is being removed */
	$scope.changeNoteLabelViaLabelsPage = function(note, label, $index) {

		if(note === null || label === null || typeof note !== 'object' || typeof label !== 'string')
			return;

		var index = note.labels.indexOf(label);
		if(index == -1)
			note.labels.push(label);
		else {
			if($scope.selectedLabels.indexOf(label) == -1)
				note.labels.splice(index, 1);
			else {
				$('#note-edit-modal-' + $index).on('hidden.bs.modal', function() {
					note.labels.splice(index, 1);
					$scope.$apply();
				});
				$('#note-edit-modal-' + $index).modal('hide');
			}
		}

		data.updateNote(note);
	};


	/* Add a new label to labels */
	$scope.addLabel = function(newLabel) {

		$('#add-label-form input').val('');	// reset the input box

		if(newLabel === null || typeof newLabel !== 'string')
			return;

		for(var i = 0; i < $scope.labels.length; i++) {
			if(newLabel.toLowerCase() == $scope.labels[i].toLowerCase()) {	// label already exists
				alertToast('Label already exists.');
				return;
			}
		}

		$scope.labels.push(newLabel);

		var isMobile = window.matchMedia('only screen and (max-width: 800px)');	// rebind the event to automatically close the sidebar when user selects a sidebar link on small devices
		if(isMobile.matches) {
			setTimeout(function() {
				$('.sidebar-container a').on('click', function() {
					$('.sidebar-container').removeClass('sidebar-toggled');
					$('.swipe-listener').removeClass('swipe-toggled');
				});
			}, 1000);
		}

		setRippleEffects();	// reapply the ripple effects

		data.addLabel(newLabel);
	};

	/* Remove a label from labels and from the notes that have it */
	$scope.removeLabel = function(label) {

		if(label === null || typeof label !== 'string')
			return;

		for(var i = 0; i < $scope.notes.length; i++) {
			if(typeof $scope.notes[i].labels === 'undefined')
				continue;

			var index = $scope.notes[i].labels.indexOf(label);
			if(index != -1) {
				$scope.notes[i].labels.splice(index, 1);
				data.updateNote($scope.notes[i]);
			}
		}

		var index = $scope.labels.indexOf(label);
		$scope.labels.splice(index, 1);

		data.removeLabel(label);
	};


	/* Set selected labels (notes with these labels are shown) */
	$scope.setSelectedLabels = function(arr) {

		$scope.selectedLabels = arr;
	};


	/* Set currently edited note (the note being edited, which is to be updated) */
	$scope.setCurrentNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		$scope.currentNote = note;
	};


	/* Open a note's edit modal via its view modal */
	$scope.openEditModalViaViewModal = function(note, $index) {

		$('#note-view-modal-' + $index).modal('hide');
		$('#note-edit-modal-' + $index).modal('show');

		$scope.currentNote = note;
	};


	/* Reset current note when an edit modal is closed */
	$scope.setEditModalCloseToResetCurrentNote = function() {

		$('.note-edit-modal').off('hidden.bs.modal');
		$('.note-edit-modal').on('hidden.bs.modal', function() {

			data.updateNote($scope.currentNote);	// update the current note

			if(recognizing) {	// stop speech input, if it is active
				startDictation(null, '');
			}

			$scope.currentNote = null;	// reset the current note
		});
	};


	/* Take speech input for a note */
	$scope.speechInput = function($index) {

		var modalId = '#note-edit-modal-' + $index;
		var editboxSelector = modalId + ' ' + '[contenteditable=true]';

		startDictation(event, editboxSelector);
	};


	/* Log all notes */
	$scope.logNotes = function() {

		console.log($scope.notes);
	};


	/* Sign out the user */
	$scope.signout = function() {

		authentication.signout();
		$state.go('landing');
	//	location.reload();
	};


	/* On ng-repeat finished event (implemented via a filter hack) */
	var ngRepFinCounter = 0;
	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

		ngRepFinCounter++;
		console.log('ngRepeatFinished ' + ngRepFinCounter);

		if($scope.currentNote != null && ngRepFinCounter >= 10 /* 5 */) {
			data.updateNoteContent($scope.currentNote);
			ngRepFinCounter = 0;
		}
		textareaAutoResizer();
	//	setBackButtonToModalClose();
		$scope.setEditModalCloseToResetCurrentNote();
		setLayout(5);
	});
});
