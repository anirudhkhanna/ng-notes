
var classes = [	"color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8", "color9" ];


var app = angular.module('notesApp', ['froala', 'ngAnimate']);

app.controller('notesController', function($scope) {

	$scope.titleMaxLength = 100;

	$scope.notes = [
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
			content: 'Some readme',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
	];

	/* Options for Froala Editor */
	$scope.froalaOptions = {
			placeholderText: 'Take a note...',
			end_with_newline: true,
			heightMin: 300,
			heightMax: 375,
			multiLine: true,
			toolbarButtons: ['bold', 'italic', 'underline', '|', 'align', 'formatOL', 'formatUL', '|', 'color', 'emoticons', 'insertLink', 'insertImage', 'html'],
			toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'emoticons', '|', 'align', 'formatOL', 'formatUL', '|', 'insertLink', 'insertImage', 'html'],
			toolbarButtonsSM: ['bold', 'italic', 'underline', '|', 'emoticons', '|', 'align', 'formatOL', 'formatUL', '|', 'insertLink', 'insertImage', 'html'],
			toolbarButtonsXS: ['bold', 'italic', 'underline', '|', 'emoticons', '|', 'align', 'formatOL', 'formatUL', '|', 'insertLink', 'insertImage', 'html'],
			toolbarInline: false,
			zIndex: 9995,
			tooltips: true,
			lineBreakerOffset: 0,
			charCounterCount: false,
			extra_liners: "['h1']",
			shortcutsHint: false,
			spellcheck: true,
			tabSpaces: 4,
			theme: 'gray',
			toolbarBottom: false,
/*			events: {
            	'froalaEditor.initialized': (e, editor) => {
        	  		editor.toolbar.hide();
        		},
        		'froalaEditor.focus': (e, editor) => {
          			editor.toolbar.show();
        		},
        		'froalaEditor.blur': (e, editor) => {
          			editor.toolbar.hide();
        		}
			},
*/
		};



	/* Autofocus the content when modal opened in edit mode */
	$scope.modalOpenEditMode = function($index) {

		var modalId = '#note-modal-' + $index;
		var isEditMode = true;
		modalTextareaAutoFocus(modalId, isEditMode);
	}


	/* Copy a note from notes */
	$scope.copyNote = function($index) {
		
		// Make a new note
		var newNote = {};

 		newNote.title = $scope.notes[$index].title;
 		newNote.content = $scope.notes[$index].content;
 		newNote.class = $scope.notes[$index].class;

 		// Prepend newNote in the notes array
		$scope.notes.unshift(newNote);

		setTimeout(function() {
			textareaAutoResizer();
			setLayout(5);
		}, 50);
	}


	/* Remove a note from notes */
	$scope.removeNote = function($index) {
		
		$scope.notes.splice($index, 1);

		setLayout(5);
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
			setLayout(5);
		}, 50);

		// Close the modal when note saved successfully
		submitBtn.setAttribute('data-dismiss', 'modal');
	}

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
		setLayout(5);

		return result;
	};

});


app.directive('modalsFinishDirective', function() {
	return function(scope, element, attrs) {
		if (scope.$last){
			textareaAutoResizer();
			setBackButtonToModalClose();
			initLayout();
			setLayout(10);
		}
	}
});
