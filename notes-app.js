
/* Notes app */
var app = angular.module('notesApp', ['froala']);

/* Notes conrtroller */
app.controller('notesController', function($scope) {

	/* Color classes for notes */
	$scope.colorClasses = [
		"color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8", "color9", "color10"
	];


	/* Max length of note title */
	$scope.titleMaxLength = 100;


	/* Notes data */
	$scope.notes = [
		{
			title: 'Happy Birthday!',
			content: '<span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f604.svg);">&nbsp;</span> <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f600.svg);">&nbsp;</span><p>Happy birthday, Anirudh Khanna.</p>',
			colorClass: $scope.colorClasses[0],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'Some useful Git commands',
			content: '<p>Quick reference:</p> <ul> <li><em>git checkout master</em></li> <li><em>git add -A</em></li> <li><em>git commit -m &#39;Awesome new commit!&#39;</em></li> <li><em>git push origin master</em></li> <li><em>git checkout gh-pages</em></li> <li><em>git merge master</em></li> <li><em>git push origin gh-pages</em></li> </ul>',
			colorClass: $scope.colorClasses[1],
			isArchived: false,
			isTrashed: false
		},
		{
			title: '',
			content: '<p>&quot;ng-notes&quot; is made in AngularJS.</p><p>See the AngularJS tutorial on <a href="https://docs.angularjs.org/tutorial" target="_blank">https://docs.angularjs.org/tutorial</p>',
			colorClass: $scope.colorClasses[8],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'A Note With a Really Long Title Because We Like Long Titles. They Are Fun!',
			content: 'Some other things to like: <br> <ol><li><strong>Chocolates</strong></li><li><strong>ng-notes</strong></li><li><strong>Linux</strong></li></ol>',
			colorClass: $scope.colorClasses[5],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'Greeting Cards',
			content: '<p><img src="http://slodive.com/wp-content/uploads/2013/01/christmas-card-ideas/serus-christmas-card.jpg" style="width: 322px; height: 322px;" class="fr-fic fr-dib"></p> <p><span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f604.svg);">&nbsp;</span><span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f60d.svg);">&nbsp;</span>&nbsp; <br>The custom of sending greeting cards can be traced back to the ancient Chinese, who exchanged messages of good will to celebrate the New Year, and to the early Egyptians, who conveyed their greetings on papyrus scrolls. <br> <br>- Wikipedia</p>',
			colorClass: $scope.colorClasses[6],
			isArchived: false,
			isTrashed: false
		},
		{
			title: '',
			content: '&ldquo;It is good to have big dreams. <br />Even if the dreams are shattered, the shattered pieces are still big.&rdquo;',
			colorClass: $scope.colorClasses[7],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'Elephant in the field',
			content: '<p><img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg" class="fr-fil fr-dib"></p>',
			colorClass: $scope.colorClasses[4],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'My First Note with really long heading',
			content: 'Some readme Some readme Some readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readme',
			colorClass: $scope.colorClasses[2],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'My First Note',
			content: '<img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg"/>',
			colorClass: $scope.colorClasses[0],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'A1 My First Note',
			content: '<img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg"/>',
			colorClass: $scope.colorClasses[0],
			isArchived: true,
			isTrashed: false
		},
		{
			title: 'A2 My First Note',
			content: '<img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg"/>',
			colorClass: $scope.colorClasses[0],
			isArchived: true,
			isTrashed: false
		},
	];


	/* Dummy note object */
	$scope.note = {
		title: '',
		content: '',
		colorClass: ''
	};


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


	/* Make copy of a note */
	$scope.copyNote = function(note) {
		
		if(note === null || typeof note !== 'object')
			return;

		var index = $scope.notes.indexOf(note);

		// Make a new note object as the copy
		var newNote = {};

		newNote.title = $scope.notes[index].title;
		newNote.content = $scope.notes[index].content;
		newNote.colorClass = $scope.notes[index].colorClass;

		// Prepend the new note in the notes array
		$scope.notes.unshift(newNote);
	}


	/* Remove a note from notes */
	$scope.removeNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes.splice(index, 1);
	}


	/* Remove a note via a modal - only after the modal has closed */
	$scope.removeNoteViaModal = function(note, $index) {
		
		$('#note-view-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.removeNote(note);
			$scope.$apply();
		});

		$('#note-edit-modal-' + $index).on('hidden.bs.modal', function() {
			$scope.removeNote(note);
			$scope.$apply();
		});
	}


	/* Archive a note */
	$scope.archiveNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes[index].isArchived = true;
	}


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
	}

	/* Unarchive a note */
	$scope.unarchiveNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes[index].isArchived = false;
	}


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
	}


	/* Add a note to notes */
	$scope.addNote = function() {

		// Override close functionality of the modal
		var submitBtn = document.getElementById('submit-btn');
		submitBtn.removeAttribute('data-dismiss');

		// Fail if the note is empty
		if(!$scope.note.content && !$scope.note.title) {
			return;
		}

		// Make a new note
		var newNote = {};

		newNote.title = $scope.note.title;
		newNote.content = $scope.note.content;

		// Prepend newNote in the notes array
		$scope.notes.unshift(newNote);

		// Reset the values back to empty
		document.getElementById('newtitle').value = '';
		document.getElementById('newcontent').value = '';
		$scope.note = {
			title: '',
			content: '',
			colorClass: ''
		};

		setTimeout(function() {
			textareaAutoResizer();
		}, 50);

		// Close the modal when note saved successfully
		submitBtn.setAttribute('data-dismiss', 'modal');
	}


	/* Set the color of a note */
	$scope.setNoteColor = function(note, colorClass) {

		if(note === null || colorClass === null || typeof note !== 'object' || typeof colorClass !== 'string')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes[index].colorClass = colorClass;
	}


	/* Open a note's edit modal via its view modal */
	$scope.openEditModalViaViewModal = function($index) {

		$('#note-view-modal-' + $index).modal('hide');
		$('#note-edit-modal-' + $index).modal('show');
	}


	/* Take speech input for a note */
	$scope.speechInput = function($index) {

		var modalId = '#note-edit-modal-' + $index;
		var editboxSelector = modalId + ' ' + '[contenteditable=true]';

		startDictation(event, editboxSelector);
	}


	/* On ng-repeat finished event (implemented via a filter hack) */
	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {

		textareaAutoResizer();
		setBackButtonToModalClose();
		setLayout(5);
	});

});
// controller over


/* Filter for search */
app.filter('searchFor', function() {

	// All filters must return a function whose first parameter is
	// the data that is to be filtered, and the second is an argument
	// that may be passed with a colon (eg. searchFor:searchString)

	return function(arr, searchString) {

		if(!searchString) {
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item) {
			if(item.title.toLowerCase().indexOf(searchString) !== -1 || 
				item.content.toLowerCase().indexOf(searchString) !== -1) {
				result.push(item);
			}
		});

		return result;
	};
});


/* Filter for generating the ng-repeat finished event (track for any kind of re-rendering) */
app.filter('ngRepeatFinish', function($timeout) {

	return function(data, scope) {

		var me = scope;
		var flagProperty = '__finishedRendering__';

		if(!data[flagProperty]) {

			Object.defineProperty(
				data,
				flagProperty,
				{enumerable: false, configurable: true, writable: false, value: {}}
			);

			$timeout(function() {
				delete data[flagProperty];
				me.$emit('ngRepeatFinished');
			}, 0, false);
		}

		return data;
	};
});


/* Directive for tracking the completion of ng-repeat for edit modals */
app.directive('editModalsLoadedDirective', function() {

	return function(scope, element, attrs) {

		if(scope.$last) {
			textareaAutoResizer();
			setBackButtonToModalClose();
			initLayout();
		}
	}
});


/* Directive for tracking the completion of ng-repeat for view modals */
app.directive('viewModalsLoadedDirective', function() {

	return function(scope, element, attrs) {

		if(scope.$last) {
			setBackButtonToModalClose();
		}
	}
});
