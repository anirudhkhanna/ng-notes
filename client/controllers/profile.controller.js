var app = angular.module('notesApp');

/* Profile controller */
app.controller('profileController', function($scope, $state, authentication, data) {

	/* Set up the view-model */
	var vm = this;

	/* Flags for editing name, email */
	vm.isEditingName = false;
	vm.isEditingEmail = false;

	/* Current user details object */
	vm.currentUser = {};

	/* Dummy user details object */
	vm.dummyUser = {};

	/* Change password object */
	vm.changePassword = {
		oldPassword: '',
		newPassword: '',
		confirmNewPassword: ''
	};

	/* Remove user object */
	vm.removeUserConfirmation = {
		password: ''
	};

	/* Get details of the current user */
	data.getUser()
		.success(function(data) {
			vm.dummyUser._id = data._id;
			vm.dummyUser.name = data.name;
			vm.dummyUser.email = data.email;
			vm.dummyUser.avatar = data.avatar;

			data.avatar = 'assets/images/' + data.avatar;
			vm.currentUser = data;
		})
		.error(function(err) {
			alertToast('An error occurred while loading user details. ' + err.message);
		});

	/* Update the user with the data in dummy user object */
	vm.updateUser = function() {

		if(vm.isEditingName) {
			if(typeof vm.dummyUser.name !== 'string' || vm.dummyUser.name.length == 0) {
				alertToast('Please enter your name.');
				vm.dummyUser.name = vm.currentUser.name;
				return;
			}
		}

		if(vm.isEditingEmail) {
			if(typeof vm.dummyUser.email !== 'string' || vm.dummyUser.email.length == 0) {
				alertToast('Please enter a valid email address.');
				vm.dummyUser.email = vm.currentUser.email;
				return;
			}
		}

		// Update user details
		data.updateUser(vm.dummyUser)
			.success(function() {
				vm.isEditingName = false;
				vm.isEditingEmail = false;
				alertToast('Changes saved successfully.', 'success');

				// Reload user details for this controller and the parent controller
				data.getUser()
					.success(function(data) {
						vm.dummyUser._id = data._id;
						vm.dummyUser.name = data.name;
						vm.dummyUser.email = data.email;
						vm.dummyUser.avatar = data.avatar;

						data.avatar = 'assets/images/' + data.avatar;
						vm.currentUser = data;
						$scope.$parent.currentUser = data;
					})
					.error(function(err) {
						alertToast('An error occurred while loading user details. ' + err.message);
					});
			})
			.error(function(err) {
				alertToast(err.message);
				return;
			});
	};

	/* Change the user password */
	vm.changeUserPassword = function() {

		if(typeof vm.changePassword.oldPassword !== 'string' || typeof vm.changePassword.newPassword !== 'string' || typeof vm.changePassword.confirmNewPassword !== 'string' || 
		vm.changePassword.oldPassword.length === 0 || vm.changePassword.newPassword.length === 0 || vm.changePassword.confirmNewPassword.length === 0) {
			alertToast('Please enter your old password, new password and its confirmation.');
			return;
		}

		if(vm.changePassword.newPassword.length < 6) {
			alertToast('Password should contain at least 6 characters.');
			return;
		}

		if(vm.changePassword.newPassword !== vm.changePassword.confirmNewPassword) {
			alertToast('The new password and its confirmation do not match.');
			return;
		}

		// Change user password
		data.changeUserPassword(vm.changePassword)
			.success(function() {
				$('#change-password-modal').modal('hide');
				alertToast('Password changed successfully.', 'success');
			})
			.error(function(err) {
				alertToast(err.message);
			});
	};

	/* Remove the user and his/her data */
	vm.removeUser = function() {

		if(typeof vm.removeUserConfirmation.password !== 'string' || vm.removeUserConfirmation.password.length === 0) {
			alertToast('Please enter your password for confirmation.');
			return;
		}

		// Remove the user
		data.removeUser(vm.removeUserConfirmation.password)
			.success(function() {
				$('#delete-account-modal').modal('hide');
				authentication.signout();

				swal({
					title: '',
					text: 'Your account was removed successfully. Thank you for trying out ng-notes.',
					imageUrl: 'assets/images/animation-removed.gif',
					confirmButtonText: 'OK'
				},
				function() {
				//	$state.go('landing');
					location.reload();
				});
			})
			.error(function(err) {
				alertToast(err.message);
			});
	};

	/* Layout set up */
	setBackButtonToModalClose();
	setLayout(5);
});
