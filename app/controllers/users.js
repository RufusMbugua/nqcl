app.controller(
	"usersCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		'md5', 'localStorageService', '$rootScope', 'Session',

		function(scope, filter, timeout, state, Restangular, md5,
			localStorageService, rootScope, Session) {

			Session.checkIfLogged();

			var Users = Restangular.all('users');
			var UserTypes = Restangular.all('usertypes');

			var user = [];
			scope.alerts = [];
			getUsers();

			/**
			 * [login description]
			 * @return {[type]} [description]
			 */
			scope.login = function login() {
				scope.user.request = 'login';
				scope.user.password = md5.createHash(scope.user.password || '');
				Users.post(scope.user).then(function(response) {
					localStorageService.set('user', response[0]);
					rootScope.user = response[0];
					if (rootScope.user.usertype.name == 'Administrator') {
						rootScope.admin = true;
					} else {
						rootScope.admin = false;
					}

					state.go('admin');
				});
			}

			function getUsers() {
				Users.getList().then(function(users) {
					scope.users = users;
				})
			}

			/**
			 * [editUser description]
			 * @return {[type]} [description]
			 */
			scope.editUser = function editUser() {
					user = scope.user;
					user.request = 'update';
					Users.customPUT(scope.user).then(function(response) {
						var alert = {
							type: response.type,
							msg: response.text
						}
						scope.alerts.push(alert);
						Session.update(user);
					})
				}
				/**
				 * [newUser description]
				 * @return {[type]} [description]
				 */
			scope.newUser = function newUser() {

				/**
				 * Reinitialize user object
				 * @type {Object}
				 */
				scope.new_user_flag = true;
				scope.user = {};
				UserTypes.getList().then(function(usertypes) {
					scope.options = usertypes;
				});

			}

			/**
			 * [addUser description]
			 */
			scope.addUser = function addUser() {

				/**
				 * Request String
				 * @type {String}
				 */
				scope.user.request = 'add';
				Users.post(scope.user).then(function(response) {

					/**
					 * Alert Object
					 * @type {Object}
					 */
					var alert = {
						type: response.type,
						msg: response.text
					}

					/**
					 * Push an Alert to Alerts Array
					 * @param  {object} alert [description]
					 * @return {[type]}       [description]
					 */
					scope.alerts.push(alert);
				});
			}

			/**
			 * Reset List to Members
			 */
			scope.resetList = function resetList() {
				scope.new_user_flag = false;
				rootScope.user = localStorageService.get('user');
				scope.user = rootScope.user;
				if (rootScope.user.usertype.name == 'Administrator') {
					rootScope.admin = true;
				}

			}

			/**
			 * Remove selected alert
			 * @param {[type]} index [description]
			 */
			scope.closeAlert = function(index) {

				/**
				 * Remove selected alert
				 * @param  {[type]} index [description]
				 * @param  {[type]} 1     [description]
				 * @return {[type]}       [description]
				 */
				scope.alerts.splice(index, 1);
			};

		}
	]
);
