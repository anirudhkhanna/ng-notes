/* Color classes */
var classes = [	"color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8", "color9", "color10" ];


/* Notes app */
var app = angular.module('notesApp', ['froala']);


app.controller('notesController', function($scope) {

	/* Color classes */
	$scope.classes = [	"color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8", "color9", "color10" ];
	
	/* Max length of note title */
	$scope.titleMaxLength = 100;

	/* Notes data */
	$scope.notes = [
		{
			title: 'Happy Birthday',
			content: '<span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f604.svg);">&nbsp;</span> <span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f600.svg);">&nbsp;</span>&nbsp;',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'http://www.tutorialspoint.com/android/',
			content: '<b>Android tutorials on http://www.tutorialspoint.com/android/images/android-mini-logo.jpg</b>',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My Second Note',
			content: '<img src="http://wallpaper-gallery.net/images/dubai-images/dubai-images-8.jpg" />',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My First Note My First Note My First Note My First Note uyr uyi itiyryt rr utut',
			content: 'Some readme <br> <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'http://www.tutorialspoint.com/android/',
			content: '<span class="fr-emoticon fr-deletable fr-emoticon-img" style="background: url(https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/1f60c.svg);">&nbsp;</span> <br> <img src="http://anirudhkhanna.github.io/images/anirudhkhanna.jpg"/> Android tutorials on http://www.tutorialspoint.com/android/images/android-mini-logo.jpg Android tutorials on http://www.tutorialspoint.com/android/images/android-mini-logo.jpg Android tutorials on http://www.tutorialspoint.com/android/images/android-mini-logo.jpg',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My First Note with really long heading',
			content: 'Some readme <br> <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My First Note',
			content: '<img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg"/>',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My First Note with really long heading',
			content: 'Some readme Some readmeSome readmeSome readmeSome readmeSomereadmereadmereadmereadme readmeSome readmeSome readmeSome readme',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My Second Note',
			content: 'Some readme',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My Second Note',
			content: 'Some readme',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My Second Note',
			content: 'Some readme',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My First Note with really long heading',
			content: 'Some readme Some readme Some readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readmeSome readme',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My Second Note',
			content: 'Some readme',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My First Note',
			content: '<img src="https://s3-us-west-1.amazonaws.com/powr/defaults/image-slider2.jpg"/>',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'http://www.tutorialspoint.com/android/',
			content: 'Android tutorials on http://www.tutorialspoint.com/android/images/android-mini-logo.jpg',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My First Note',
			content: 'Some readme',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'http://www.tutorialspoint.com/android/',
			content: 'Android tutorials on http://www.tutorialspoint.com/android/images/android-mini-logo.jpg Android tutorials on http://www.tutorialspoint.com/android/images/android-mini-logo.jpg Android tutorials on http://www.tutorialspoint.com/android/images/android-mini-logo.jpg',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'http://www.tutorialspoint.com/android/',
			content: 'Android tutorials on http://www.tutorialspoint.com/android/images/android-mini-logo.jpg',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My First Note',
			content: 'Some readme final note',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
	];

	/* Options for Froala Editor */
	$scope.froalaOptions = {
		heightMin: 300,
		heightMax: 375,
		zIndex: 9000,
		multiLine: true,
		placeholderText: 'Take a note...',
		charCounterCount: false,
		toolbarInline: false,
		toolbarButtons: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', '|', 'color', 'emoticons', 'insertLink', 'insertImage', 'html'],
		toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', '|', 'color', 'emoticons', 'insertLink', 'insertImage', 'html'],
		toolbarButtonsSM: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', '|', 'color', 'emoticons', 'insertLink', 'insertImage', 'html'],
		toolbarButtonsXS: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', '|', 'color', 'emoticons', 'insertLink', 'insertImage', 'html'],
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
 		newNote.class = $scope.notes[index].class;

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

	/* Remove a note via a modal - after the modal has closed */
	$scope.removeNoteViaModal = function(note, $index) {
		
		$('#note-view-modal-' + $index).on('hidden.bs.modal', function () {
			$scope.removeNote(note);
			$scope.$apply();
    	});

		$('#note-edit-modal-' + $index).on('hidden.bs.modal', function () {
			$scope.removeNote(note);
			$scope.$apply();
    	});
	}


	/* Add a note to notes */
	$scope.note = {
		title: '',
		content: '',
		class: ''
	};
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
 		newNote.class = classes[Math.floor(Math.random()*classes.length)];

 		// Prepend newNote in the notes array
		$scope.notes.unshift(newNote);

		// Reset the values back to empty
		document.getElementById('newtitle').value='';
		document.getElementById('newcontent').value='';
		$scope.note = {
			title: '',
			content: '',
			class: ''
		};

		setTimeout(function() {
			textareaAutoResizer();
		}, 50);
		//setLayout(5);

		// Close the modal when note saved successfully
		submitBtn.setAttribute('data-dismiss', 'modal');
	}


	/* Set the color of a note */
	$scope.setNoteColor = function(note, classname) {
		
		if(note === null || classname === null || typeof note !== 'object' || typeof classname !== 'string')
			return;

		var index = $scope.notes.indexOf(note);
		$scope.notes[index].class = classname;
	}


	/* Open a note's edit modal via its view modal */
	$scope.openEditModalViaViewModal = function($index) {

		$('#note-view-modal-' + $index).modal('hide');
		$('#note-edit-modal-' + $index).modal('show');
	}


	/* Take speech input for note */
	$scope.speechInput = function($index) {

		var modalId = '#note-edit-modal-' + $index;
		var editorSelector = modalId + ' [contenteditable=true]';

		startDictation(event, editorSelector);
	}



	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
	//  alert('t');
		console.log('run      ' + i);
		i++;
		textareaAutoResizer();
		setBackButtonToModalClose();
		setLayout(5);
	});


});

var i = 0;
app.filter('ngRepeatFinish', function($timeout){

    return function(data, scope){

        var me = scope;
        console.log(me);
        var flagProperty = '__finishedRendering__';
        if(!data[flagProperty]){

            Object.defineProperty(
                data, 
                flagProperty, 
                {enumerable:false, configurable:true, writable: false, value:{}}
            );
            
            $timeout(function(){
                    delete data[flagProperty];
                    me.$emit('ngRepeatFinished');
            }, 0, false);                
        }

        return data;
    };
});

/* Filter for search */
app.filter('searchFor', function() {

	// All filters must return a function whose first parameter is
	// the data that is to be filtered, and the second is an argument
	// that may be passed with a colon (eg. searchFor:searchString)

	return function(arr, searchString) {
		if(!searchString){
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

		// Set the layout again
		//setLayout(5);

		return result;
	};
});


/* Directive for tracking the completion of ng-repeat for edit modals */
app.directive('editModalsLoadedDirective', function() {

	return function(scope, element, attrs) {

		if (scope.$last){
			textareaAutoResizer();
			setBackButtonToModalClose();
			initLayout();
		//	setLayout(10);
		}
	}
});


/* Directive for tracking the completion of ng-repeat for view modals */
app.directive('viewModalsLoadedDirective', function() {

	return function(scope, element, attrs) {

		if (scope.$last){
			setBackButtonToModalClose();
		}
	}
});
