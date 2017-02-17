
/* Loading bar element */
var cfpLoadingBarElem = null;

/* Notes app */
var app = angular.module('notesApp', ['froala', 'ui.router', 'chieffancypants.loadingBar' /* , 'angular-loading-bar'*/ ]);

/* Notes conrtroller */
app.controller('notesController', function($scope, cfpLoadingBar) {

	/* Assign the loading bar element for use outside the controller */
	cfpLoadingBarElem = cfpLoadingBar;

	/* Color classes for notes */
	$scope.colorClasses = [
		'color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10'
	];

	/* Labels for notes */
	$scope.labels = [
		'Inspiration', 'Personal', 'Work', 'Miscellaneous'
	];

	/* Selected labels (notes with these labels are shown) */
	$scope.selectedLabels = [
		// initially empty (all notes are shown)
	];

	/* Max length of note title */
	$scope.titleMaxLength = 100;

	/* Notes data */
	$scope.notes = [
		{
			title: 'My new note!',
			content: '<p>Event binding:</p><pre><code>setTimeout(function() {</code><code>&nbsp; &nbsp; textareaAutoResizer();</code><code>}, 50);&nbsp;</code></pre>',
			dateCreated: 'Feb 11, 2017',
			labels: [
						$scope.labels[2]
					],
			colorClass: $scope.colorClasses[8],
			isArchived: false,
			isTrashed: true
		},
		{
			title: 'Happy Birthday!',
			content: '<span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f604.svg);">&nbsp;</span> <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f600.svg);">&nbsp;</span><p>Happy birthday, Anirudh Khanna.</p>',
			dateCreated: 'Feb 3, 2017',
			labels: [
						$scope.labels[1]
					],
			colorClass: $scope.colorClasses[0],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'Some useful Git commands',
			content: '<p>Quick reference:</p> <ul> <li><em>git checkout master</em></li> <li><em>git add -A</em></li> <li><em>git commit -m &#39;Awesome new commit!&#39;</em></li> <li><em>git push origin master</em></li> <li><em>git checkout gh-pages</em></li> <li><em>git merge master</em></li> <li><em>git push origin gh-pages</em></li> </ul>',
			dateCreated: 'Feb 3, 2017',
			colorClass: $scope.colorClasses[1],
			labels: [
						$scope.labels[2],
						$scope.labels[3]
					],
			isArchived: false,
			isTrashed: false
		},
		{
			title: '',
			content: '<p>&quot;ng-notes&quot; is made in AngularJS.</p><p>See the AngularJS tutorial on <a href="https://docs.angularjs.org/tutorial" target="_blank">https://docs.angularjs.org/tutorial</p>',
			dateCreated: 'Jan 31, 2017',
			labels: [
					],
			colorClass: $scope.colorClasses[8],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'The problems of being too intelligent',
			content: '<p>1. You can&#39;t stand normal people talking. You feel like 90% of their communication is obvious, banal and time-wasting. And things that interest you like science, philosophy and other stuff are boring for other people.</p><p><br><span>2. You have a pressure to speak only when you got something brilliant, so mostly you say nothing.</span></p><p><br>3. You strive for everything that is new and unknown. So your job after a while becomes not-good enough, because you know it all.</p><p><br><span>4. You spend too much time thinking about something rather than doing it.</span></p><p><br>5. You waste your life on accumulating useless knowledge, just for fun.</p><p><br><span>6. It&#39;s hard to be spontaneous.</span></p>',
			dateCreated: 'Dec 29, 2016',
			colorClass: $scope.colorClasses[5],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'A Note With a Really Long Title Because We Like Long Titles. They Are Fun!',
			content: '<p>Some other things we like:</p><ol><li><strong>Chocolates</strong></li><li><strong>ng-notes</strong></li><li><strong>Linux</strong></li><li><strong>Git</strong></li><li><strong>GitHub</strong></li><li><strong>OpenSource</strong></li><li><strong>C</strong></li><li><strong>Java</strong></li><li><strong>HTML, CSS, JS</strong></li><li><strong>MEAN Stack</strong></li><li><strong>StackOverflow</strong></li><li><strong>Google</strong></li><li><strong>And the rest of the geek stuff on earth</strong></li></ol>',
			dateCreated: 'Dec 21, 2016',
			labels: [
						$scope.labels[0],
						$scope.labels[1]
					],
			colorClass: $scope.colorClasses[5],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'Greeting Cards',
			content: '<p><img src="http://slodive.com/wp-content/uploads/2013/01/christmas-card-ideas/serus-christmas-card.jpg" style="width: 322px; height: 322px;" class="fr-fic fr-dib"></p> <p><span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f604.svg);">&nbsp;</span><span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f60d.svg);">&nbsp;</span>&nbsp; <br>The custom of sending greeting cards can be traced back to the ancient Chinese, who exchanged messages of good will to celebrate the New Year, and to the early Egyptians, who conveyed their greetings on papyrus scrolls. <br> <br>- Wikipedia</p>',
			dateCreated: 'Nov 3, 2016',
			labels: [
						$scope.labels[3]
					],
			colorClass: $scope.colorClasses[6],
			isArchived: false,
			isTrashed: false
		},
		{
			title: '',
			content: '&ldquo;It is good to have big dreams. <br />Even if the dreams are shattered, the shattered pieces are still big.&rdquo;',
			dateCreated: 'Oct 26, 2016',
			labels: [
						$scope.labels[0]
					],
			colorClass: $scope.colorClasses[7],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'Elephant in the field',
			content: '<p><img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg" class="fr-fil fr-dib"></p>',
			dateCreated: 'Sep 15, 2016',
			colorClass: $scope.colorClasses[4],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'My First Note with really long heading',
			content: 'Some readme Some readme Some readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readme',
			dateCreated: 'Aug 11, 2016',
			colorClass: $scope.colorClasses[2],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'My First Note',
			content: '<img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg"/>',
			dateCreated: 'Jul 3, 2016',
			labels: [
						"Miscellaneous"
					],
			colorClass: $scope.colorClasses[0],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'A1 My First Note',
			content: '<img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg"/>',
			dateCreated: 'Jun 3, 2016',
			labels: [
						"Miscellaneous"
					],
			colorClass: $scope.colorClasses[0],
			isArchived: true,
			isTrashed: false
		},
		{
			title: 'A2 My First Note',
			content: '<img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg"/>',
			dateCreated: 'May 3, 2016',
			colorClass: $scope.colorClasses[0],
			isArchived: true,
			isTrashed: false
		},
	];

	/* Dummy note object */
	$scope.note = {
		title: '',
		content: '',
		dateCreated: '',
		labels: [],
		colorClass: '',
		isArchived: false,
		isTrashed: false
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

		// Make a new note object as the copy
		var newNote = {};

		newNote.title = note.title;
		newNote.content = note.content;
		newNote.dateCreated = getCurrentDate();
		newNote.labels = note.labels.slice();	// make a copy of the labels array, not just a reference to the same one
		newNote.colorClass = note.colorClass;
		newNote.isArchived = note.isArchived;
		newNote.isTrashed = note.isTrashed;

		// Prepend the new note in the notes array
		$scope.notes.unshift(newNote);
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


	/* Trash a note */
	$scope.trashNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes[index].isTrashed = true;
	}

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
	}

	/* Untrash a note */
	$scope.untrashNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes[index].isTrashed = false;
	}

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
	}


	/* Permanently remove a note from notes */
	$scope.permanentlyRemoveNote = function(note) {

		if(note === null || typeof note !== 'object')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes.splice(index, 1);
	}

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
	}


	/* Create a new note and add to notes */
	$scope.createNote = function() {

		// Make a new note
		var newNote = {};

		newNote.title = '';
		newNote.content = '';
		newNote.dateCreated = getCurrentDate();
		newNote.labels = [];
		newNote.colorClass = $scope.colorClasses[8];
		newNote.isArchived = false;
		newNote.isTrashed = false;

		// Prepend newNote in the notes array
		$scope.notes.unshift(newNote);

		// Open the edit modal for the new note
		setTimeout(function() {
			$('#note-edit-modal-0').modal('show');
		}, 300);
	}


	/* Set the color of a note */
	$scope.setNoteColor = function(note, colorClass) {

		if(note === null || colorClass === null || typeof note !== 'object' || typeof colorClass !== 'string')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes[index].colorClass = colorClass;
	}


	/* Set selected labels */
	$scope.setSelectedLabels = function(arr) {

		$scope.selectedLabels = arr;
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

		console.log('ngRepeatFinished');
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


/* Filter for labels */
app.filter('filterLabels', function() {

	return function(notes, selectedLabels) {

		if(!selectedLabels || selectedLabels.length === 0) {
			return notes;
		}

		return notes.filter(function(note) {

			for(var i in note.labels) {
				if(selectedLabels.indexOf(note.labels[i]) != -1)
					return true;
			}

			return false;
		});
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


/* Configuration for UI-Router routes */
app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/notes');

	$stateProvider

		.state('state-notes', {
			url: '/notes',
			templateUrl: 'pages/notes.html'
		})

		.state('state-archive', {
			url: '/archive',
			templateUrl: 'pages/archive.html'
		})

		.state('state-trash', {
			url: '/trash',
			templateUrl: 'pages/trash.html'
		})

		.state('state-labels', {
			url: '/labels',
			templateUrl: 'pages/labels.html'
		})
});


/* Filter for prettfying the note */
app.filter('notePrettify', function() {

	return function(content) {

		var res = content;

		var dummyElem = document.createElement('span');
		dummyElem.innerHTML = res;
		var textLength = $(dummyElem).text().length;

		if(textLength < 40) {

			var beg = '<span style = "font-size: 24px; font-weight: 300;">';
			var end = '</span>';
			res = beg + res + end;
		}
		else if(textLength < 60) {

			var beg = '<span style = "font-size: 22px; font-weight: 300;">';
			var end = '</span>';
			res = beg + res + end;
		}
		else if(textLength < 120) {

			var beg = '<span style = "font-size: 20px; font-weight: 300;">';
			var end = '</span>';
			res = beg + res + end;
		}
		else if(textLength < 140) {

			var beg = '<span style = "font-size: 18px; font-weight: 300;">';
			var end = '</span>';
			res = beg + res + end;
		}
		else if(textLength < 160) {

			var beg = '<span style = "font-size: 16px; font-weight: 300;">';
			var end = '</span>';
			res = beg + res + end;
		}

		if(textLength > 400) {
			res = res.substring(0, 400) + '...';			
		}

		return res;
	};
});


/* Handle state changes done by UI-Router */
app.run(function($rootScope) {

	$rootScope
		.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

				console.log('stateChangeStart');
				$("#ui-view").addClass("hidden");
				$(".page-loading").removeClass("hidden");
				cfpLoadingBarElem.start();
				cfpLoadingBarElem.inc();
		});

	$rootScope
		.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

				console.log('stateChangeSuccess');
				$("#ui-view").removeClass("hidden");
				$(".page-loading").addClass("hidden");
				setTimeout(cfpLoadingBarElem.complete, 700);
				cfpLoadingBarElem.inc();
		});
});
