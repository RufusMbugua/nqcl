app.controller(
	"adminCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		'Session',
		function(scope, filter, timeout, state, Restangular, Session) {
			var status;
			redirect();
			checkCurrent();

			function redirect() {
				status = Session.checkIfLogged();
				if (status == 'false') {
					state.go('login');
				} else if (status == 'true') {
					state.go('admin');
				} else {

				}
			}

			function checkCurrent() {
				var current = Session.identify();
			}
		}
	]
);
