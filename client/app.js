/* Notes app */
var app = angular.module('notesApp', ['froala', 'ui.router', /* 'chieffancypants.loadingBar' , */ 'angular-loading-bar']);

/* Configuration for UI-Router routes */
app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	$urlRouterProvider.otherwise('/landing');

	$stateProvider
		.state('landing', {
			name: 'landing',
			url: '/landing',
			templateUrl: '/views/landing.view.html',
			controller: 'landingController as vm',
		})
		.state('notes', {
			name: 'notes',
			url: '/notes',
			templateUrl: '/views/notes.view.html',
			controller: 'notesController as vm',
		})
		.state('notes.state-notes', {
			url: '/notes',
			templateUrl: 'views/sub-views/notes.notes.view.html'
		})
		.state('notes.state-archive', {
			url: '/archive',
			templateUrl: 'views/sub-views/notes.archive.view.html'
		})
		.state('notes.state-trash', {
			url: '/trash',
			templateUrl: 'views/sub-views/notes.trash.view.html'
		})
		.state('notes.state-labels', {
			url: '/labels',
			templateUrl: 'views/sub-views/notes.labels.view.html'
		})
		.state('notes.state-profile', {
			url: '/profile',
			templateUrl: 'views/sub-views/notes.profile.view.html',
			controller: 'profileController as vm',
		});

	//	$locationProvider.html5Mode(true);
});


/* Handle state changes done between views by UI-Router */
app.run(function($rootScope, $state, authentication) {

	$rootScope
		.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

			if(toState.name === 'notes' && !authentication.isLoggedIn()) {
				event.preventDefault();
				$state.go('landing');
			}

			else if(toState.name === 'notes.state-notes' && !authentication.isLoggedIn()) {
				event.preventDefault();
				$state.go('landing');
			}

			else if(toState.name === 'notes.state-archive' && !authentication.isLoggedIn()) {
				event.preventDefault();
				$state.go('landing');
			}

			else if(toState.name === 'notes.state-trash' && !authentication.isLoggedIn()) {
				event.preventDefault();
				$state.go('landing');
			}

			else if(toState.name === 'notes.state-labels' && !authentication.isLoggedIn()) {
				event.preventDefault();
				$state.go('landing');
			}

			else if(toState.name === 'notes.state-profile' && !authentication.isLoggedIn()) {
				event.preventDefault();
				$state.go('landing');
			}

			else if(toState.name === 'landing' && authentication.isLoggedIn()) {
				event.preventDefault();
				$state.go('notes.state-notes', null, {reload: true});
			}
	});
});


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


/* Filter for prettifying note tiles content */
app.filter('noteTilePrettify', function() {

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


/* Filter for prettifying note modals content */
app.filter('noteModalPrettify', function() {

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

		return res;
	};
});


/* Filter for formatting the user name */
app.filter('userNameFormat', function() {

	return function(name) {

		if(typeof name === 'string') {
			if(name.length > 25) {
				name = name.substring(0, 25) + '...';
			}
			return name;
		}

		return 'Loading...';
	};
});


/* Handle state changes done by UI-Router */
app.run(function($rootScope) {

	$rootScope
		.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

				console.log('stateChangeStart');
				$('#ui-view').addClass('hidden');
				$('.page-loading').removeClass('hidden');
			//	cfpLoadingBarElem.start();
			//	cfpLoadingBarElem.inc();
		});

	$rootScope
		.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

				console.log('stateChangeSuccess');
				$('#ui-view').removeClass('hidden');
				$('.page-loading').addClass('hidden');
			//	setTimeout(cfpLoadingBarElem.complete, 700);
			//	cfpLoadingBarElem.inc();
		});
});
