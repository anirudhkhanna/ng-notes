
/* Loading bar element */
var cfpLoadingBarElem = null;

/* Notes app */
var app = angular.module('notesApp', ['froala', 'ui.router', 'chieffancypants.loadingBar' /* , 'angular-loading-bar'*/ ]);

/* Notes conrtroller */
app.controller('notesController', function($scope, $state, cfpLoadingBar) {

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

	/* Max length of label name */
	$scope.labelMaxLength = 20;

	/* Max length of note title */
	$scope.titleMaxLength = 100;

	/* Notes data */
	$scope.notes = [
		{
			title: '',
			content: '<span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f604.svg);">&nbsp;</span> <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f600.svg);">&nbsp;</span><p>Wish Anirudh a happy birthday.</p>',
			dateCreated: 'Feb 3, 2017',
			labels: [
						$scope.labels[1]
					],
			colorClass: $scope.colorClasses[7],
			isArchived: false,
			isTrashed: false
		},
		{
			title: '',
			content: '<p>Go to the store later.</p>',
			dateCreated: 'Feb 2, 2017',
			labels: [
					],
			colorClass: $scope.colorClasses[0],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'Beautiful bag with fox design',
			content: '<p><img src="img/fox-bag-design.jpg" class="fr-fil fr-dib"></p>',
			dateCreated: 'Feb 2, 2017',
			labels: [
						$scope.labels[3]
					],
			colorClass: $scope.colorClasses[1],
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
			title: 'Finding Inspiration in Nature',
			content: '<p>1. Go for a walk in nature, practice mindfulness, and lose track of time for a while.</p><p>2. Meditate or practice yoga in a nearby park.</p><p>3. Watch children playing at the park then make a point to carry their spirit with you throughout the day.</p><p>4. Watch your cat or dog in nature and try to emulate your pet&rsquo;s mindfulness and playfulness.</p><p>5. Take a camera outside and photograph everything that looks beautiful to you.</p><p>6. Practice deep breathing while listening to nature sounds.</p><p>7. Draw or paint a scene outside your window.</p><p><br></p><p>- from <a href="http://tinybuddha.com/blog/50-ways-to-find-inspiration-create-explore-expand/" rel="noopener noreferrer" target="_blank"><em>50 Ways to Find Inspiration (Tiny Buddha)</em></a></p>',
			dateCreated: 'Dec 29, 2016',
			labels: [
						$scope.labels[0],
					],
			colorClass: $scope.colorClasses[5],
			isArchived: false,
			isTrashed: false
		},
		{
			title: '',
			content: '<p>Do the dishes tonight.</p>',
			dateCreated: 'Dec 22, 2016',
			labels: [
					],
			colorClass: $scope.colorClasses[0],
			isArchived: false,
			isTrashed: true
		},
		{
			title: 'A note with a really long title because we like long titles. They are fun!',
			content: '<p>Some other things we like:</p><ol><li><strong>Chocolates</strong></li><li><strong>ng-notes</strong></li><li><strong>Open source</strong><ol><li><em><u>Linux</u></em></li><li><em><u>Git</u></em></li></ol></li><li><strong>Programming</strong><ol><li><strong><em>C, C++</em></strong></li><li><strong><em>Java</em></strong></li></ol></li><li><strong>Web development</strong><ol><li>HTML, CSS, JS</li><li>MEAN</li></ol></li><li><strong>StackOverflow</strong></li><li><strong>Google &amp; all its cool projects</strong></li><li><strong>The rest of the geeky stuff on earth</strong></li></ol>',
			dateCreated: 'Dec 21, 2016',
			labels: [
					],
			colorClass: $scope.colorClasses[3],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'About Greeting Cards',
			content: '<p><img src="img/christmas-greeting-card.jpg" style="width: 311px; height: 262.362px;" class="fr-fic fr-dib"></p> <p><span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f604.svg);">&nbsp;</span><span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f60d.svg);">&nbsp;</span>&nbsp; <br>The custom of sending greeting cards can be traced back to the ancient Chinese, who exchanged messages of good will to celebrate the New Year, and to the early Egyptians, who conveyed their greetings on papyrus scrolls. <br> <br>- Wikipedia</p>',
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
			title: 'Little snippet',
			content: '<p>Event binding in JQuery:</p><pre><code>$<span>(</span>&#39;#anchor&#39;<span>).</span>click<span>(</span>function<span>() {</span></code><br /><code>&nbsp; &nbsp; console<span>.</span>log<span>(</span>&#39;Hi&#39;<span>);</span><br /><span>}</span></code><code><span>);</span></code></pre>',
			dateCreated: 'Oct 11, 2016',
			labels: [
						$scope.labels[2]
					],
			colorClass: $scope.colorClasses[8],
			isArchived: false,
			isTrashed: true
		},
		{
			title: 'Useful Git commands',
			content: '<p>Quick reference:</p> <ul> <li><em>git checkout master</em></li> <li><em>git add -A</em></li> <li><em>git commit -m &#39;Awesome new commit!&#39;</em></li> <li><em>git push origin master</em></li> <li><em>git checkout gh-pages</em></li> <li><em>git merge master</em></li> <li><em>git push origin gh-pages</em></li> </ul>',
			dateCreated: 'Sep 15, 2016',
			labels: [
						$scope.labels[2],
						$scope.labels[3]
					],
			colorClass: $scope.colorClasses[4],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'A painting of The Eiffel Tower',
			content: '<p><img src="img/eiffel-painting.jpg" class="fr-dib"></p>',
			dateCreated: 'Sep 10, 2016',
			labels: [
					],
			colorClass: $scope.colorClasses[8],
			isArchived: false,
			isTrashed: false
		},
		{
			title: '"A Curious Cat" by Carl Zeno',
			content: '<p><img src="img/a-curious-cat-by-carl-zeno.jpg" class="fr-dib"></p>',
			dateCreated: 'Sep 8, 2016',
			labels: [
					],
			colorClass: $scope.colorClasses[8],
			isArchived: true,
			isTrashed: false
		},
		{
			title: 'Interview tips from Monster',
			content: '<p>It&#39;s about demonstrating confidence: standing straight, making eye contact and connecting with a firm handshake. That first nonverbal impression can be a great beginning - or quick ending - to your interview.</p><p>Part of knowing how to interview is being ready to ask questions that demonstrate an interest in what goes on in the company.</p>',
			dateCreated: 'Aug 11, 2016',
			labels: [
					],
			colorClass: $scope.colorClasses[2],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'Elephant in the field',
			content: '<p><img src="img/elephant-in-the-field.jpg" class="fr-fil fr-dib"></p>',
			dateCreated: 'Jul 3, 2016',
			labels: [
						$scope.labels[3]
					],
			colorClass: $scope.colorClasses[7],
			isArchived: true,
			isTrashed: false
		},
		{
			title: '',
			content: '<p><img src="img/dog-lights.jpg" class="fr-fil fr-dib"></p>',
			dateCreated: 'Jul 3, 2016',
			labels: [
						$scope.labels[3]
					],
			colorClass: $scope.colorClasses[0],
			isArchived: false,
			isTrashed: false
		},
		{
			title: 'Groceries',
			content: '<ol><li style="">Ice cream</li><li style="">Cheese</li><li style="">Bread</li><li style="">Milk</li><li style="">Juice</li></ol>',
			dateCreated: 'Jul 2, 2016',
			labels: [
						$scope.labels[1]
					],
			colorClass: $scope.colorClasses[5],
			isArchived: true,
			isTrashed: false
		},
		{
			title: '',
			content: '<p><img src="img/chocolate-cake.jpg" class="fr-fic fr-dib"></p><p>Get a cake.</p>',
			dateCreated: 'Jul 1, 2016',
			labels: [
						$scope.labels[1]
					],
			colorClass: $scope.colorClasses[2],
			isArchived: true,
			isTrashed: false
		}
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

		note.isArchived = true;
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

		note.isArchived = false;
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

		note.isTrashed = true;
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

		note.isTrashed = false;
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

		// Clear the search string and reset the state to main notes state
		$scope.searchString = '';
		$state.go('state-notes');

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

		note.colorClass = colorClass;
	}


	/* Check for a label in the given note */
	$scope.checkNoteLabel = function(note, label) {

		return note.labels.indexOf(label) != -1;
	}

	/* Change note label - add or remove the given label */
	$scope.changeNoteLabel = function(note, label) {

		if(note === null || label === null || typeof note !== 'object' || typeof label !== 'string')
			return;

		var index = note.labels.indexOf(label);
		if(index == -1)
			note.labels.push(label);
		else
			note.labels.splice(index, 1);
	}

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
	}


	/* Add a new label to labels */
	$scope.addLabel = function(newLabel) {

		$('#add-label-form input').val('');	// reset the input box

		if(newLabel === null || typeof newLabel !== 'string')
			return;

		for(var i = 0; i < $scope.labels.length; i++) {
			if(newLabel.toLowerCase() == $scope.labels[i].toLowerCase())	// label already exists
				return;
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
	}

	/* Remove a label from labels and from the notes that have it */
	$scope.removeLabel = function(label) {

		if(label === null || typeof label !== 'string')
			return;

		for(var i = 0; i < $scope.notes.length; i++) {
			if(typeof $scope.notes[i].labels === 'undefined')
				continue;

			var index = $scope.notes[i].labels.indexOf(label);
			if(index != -1)
				$scope.notes[i].labels.splice(index, 1);
		}

		var index = $scope.labels.indexOf(label);
		$scope.labels.splice(index, 1);
	}


	/* Set selected labels (notes with these labels are shown) */
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


	/* Log all notes */
	$scope.logNotes = function() {

		console.log($scope.notes);
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
				$('#ui-view').addClass('hidden');
				$('.page-loading').removeClass('hidden');
				cfpLoadingBarElem.start();
				cfpLoadingBarElem.inc();
		});

	$rootScope
		.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

				console.log('stateChangeSuccess');
				$('#ui-view').removeClass('hidden');
				$('.page-loading').addClass('hidden');
				setTimeout(cfpLoadingBarElem.complete, 700);
				cfpLoadingBarElem.inc();
		});
});
