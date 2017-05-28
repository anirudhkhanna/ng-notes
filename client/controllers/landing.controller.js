var app = angular.module('notesApp');

/* Landing controller */
app.controller('landingController', function($state, authentication) {

	/* Set up the view-model */
	var vm = this;

	/* Registration credentials object */
	vm.registerCredentials = {
		name: '',
		email: '',
		password: '',
		avatar: 'default-user-avatar-0.png'
	};

	/* Sign in credentials object */
	vm.signinCredentials = {
		email: '',
		password: ''
	};

	/* Register a new user */
	vm.register = function() {

		if(typeof vm.registerCredentials.email !== 'string' || vm.registerCredentials.email.length == 0) {
			alertToast('Please enter a valid email address.');
			return;
		}

		if(typeof vm.registerCredentials.name !== 'string' || vm.registerCredentials.name.length == 0 || 
		typeof vm.registerCredentials.email !== 'string' || vm.registerCredentials.email.length == 0 || 
		typeof vm.registerCredentials.password !== 'string' || vm.registerCredentials.password.length == 0) {
			alertToast('Please fill all the fields.');
			return;
		}

		if(vm.registerCredentials.password.length < 6) {
			alertToast('Password should contain at least 6 characters.');
			return;
		}

		authentication.register(vm.registerCredentials)
			.error(function(err) {
				alertToast(err.message);
			})
			.then(function() {
				swal({
					title: '',
					text: getRandomLoadingMessage(),
					imageUrl: 'assets/images/animation-loading.gif',
					timer: 1000,
					showConfirmButton: false,
				},
				function() {
					$state.go('notes.state-notes');
				//	location.reload();
				});

				setTimeout(function() {
					$state.go('notes.state-notes');
				//	location.reload();
				}, 1000);
			});
	};

	/* Sign in an existing user */
	vm.signin = function() {

		if(typeof vm.signinCredentials.email !== 'string' || vm.signinCredentials.email.length == 0) {
			alertToast('Please enter a valid email address.');
			return;
		}

		if(typeof vm.signinCredentials.email !== 'string' || vm.signinCredentials.email.length == 0 || 
		typeof vm.signinCredentials.password !== 'string' || vm.signinCredentials.password.length == 0) {
			alertToast('Please fill all the fields.');
			return;
		}

		authentication.signin(vm.signinCredentials)
			.error(function(err) {
				alertToast(err.message);
			})
			.then(function() {
				swal({
					title: '',
					text: getRandomLoadingMessage(),
					imageUrl: 'assets/images/animation-loading.gif',
					timer: 1000,
					showConfirmButton: false,
				},
				function() {
					$state.go('notes.state-notes');
				//	location.reload();
				});

				setTimeout(function() {
					$state.go('notes.state-notes');
				//	location.reload();
				}, 1000);
			});
	};
});
