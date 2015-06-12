app.controller(
	"usersCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		'md5', 'localStorageService', '$rootScope', 'Session',

		function(scope, filter, timeout, state, Restangular, md5,
			localStorageService, rootScope, Session) {

			Session.checkIfLogged();

			var users = Restangular.all('users');
			var user = [];
			scope.alerts = [];
			getUsers();

			/**
			 * [login description]
			 * @return {[type]} [description]
			 */
			scope.login = function login() {
				scope.user.password = md5.createHash(scope.user.password || '');
				users.post(scope.user).then(function(response) {
					localStorageService.set('user', response[0]);
					rootScope.user = response[0];

					state.go('admin');
				});
			}

			function getUsers(){
				users.getList().then(function(users){
					scope.users=users;
				})
			}

			/**
			 * [editUser description]
			 * @return {[type]} [description]
			 */
			scope.editUser = function editUser() {
				user = scope.user;
				user.request = 'update';
				users.customPUT(scope.user).then(function(response) {
					var alert = {
						type: response.type,
						msg: response.text
					}
					scope.alerts.push(alert);
					Session.update(user);
				})
			}

			/**
			 * [addUser description]
			 */
			scope.addUser = function addUser() {
				users.post(scope.user).then(function(response) {

				})
			}

			/**
			 * [closeAlert description]
			 * @param {[type]} index [description]
			 */
			scope.closeAlert = function(index) {
				scope.alerts.splice(index, 1);
			};

		}
	]
);