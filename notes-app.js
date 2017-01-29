
var classes = [	"color1", "color2", "color3", "color4", "color5", "color6", "color7", "color8", "color9" ];


var app = angular.module('notesApp', []);

app.controller('notesController', function($scope) {

	$scope.notes = [
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
			title: 'My Second Note',
			content: 'Some readme',
			class: classes[Math.floor(Math.random()*classes.length)]
		},
		{
			title: 'My First Note with really long heading',
			content: 'Some readme',
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


	/* Remove a note from notes */
	$scope.removeNote = function(item) {
		
		var index = $scope.notes.indexOf(item);
		$scope.notes.splice(index, 1);
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

		// Close the modal when note saved successfully
		submitBtn.setAttribute('data-dismiss', 'modal');
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

		return result;
	};

});