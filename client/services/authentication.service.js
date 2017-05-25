var app = angular.module('notesApp');

/* User authentication service */
app.service('authentication', function($http, $window) {

	var getToken = function() {
		return $window.localStorage['ngn-token'];
	};

	var saveToken = function(token) {
		$window.localStorage['ngn-token'] = token;
	};

	var removeToken = function() {
		$window.localStorage.removeItem('ngn-token');
	};

	var isLoggedIn = function() {
		var token = getToken();

		if(token) {
			var payload = token.split('.')[1];
			payload = $window.atob(payload);
			payload = JSON.parse(payload);

			return payload.exp > Date.now() / 1000;
		}
		else {
			return false;
		}
	};

	var getCurrentUser = function() {
		if(isLoggedIn()) {
			var token = getToken();
			var payload = token.split('.')[1];
			payload = $window.atob(payload);
			payload = JSON.parse(payload);

			return payload;
		}
	};

	var register = function(user) {
		return $http.post('/api/register', user).success(function(data) {
			saveToken(data.token);
		});
	};

	var signin = function(user) {
		return $http.post('/api/signin', user).success(function(data) {
			saveToken(data.token);
		});
	};

	var signout = function() {
		removeToken();
	};

	return {
		getToken: getToken,
		saveToken: saveToken,
		removeToken: removeToken,
		isLoggedIn: isLoggedIn,
		getCurrentUser: getCurrentUser,
		register: register,
		signin: signin,
		signout: signout
	};
});
