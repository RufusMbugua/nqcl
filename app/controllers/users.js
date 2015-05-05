app.controller(
	"usersCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			var users = Restangular.all('users');


			scope.login = function login() {
				var someData = {
					email: 'mail@example.com',
					password: 'tested'
				}
				users.post(someData).then(function(response) {
					console.log(response);
				});
			}



		}
	]
);
