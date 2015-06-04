app.controller(
	"usersCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		'md5', 'localStorageService', '$rootScope',

		function(scope, filter, timeout, state, Restangular, md5,
			localStorageService, rootScope) {
			var users = Restangular.all('users');
			var user = [];

			scope.login = function login() {
				scope.user.password = md5.createHash(scope.user.password || '');
				users.post(scope.user).then(function(response) {
					localStorageService.set('user', response);
					rootScope.user = response;
					state.go('admin');
				});
			}

		}
	]
);
