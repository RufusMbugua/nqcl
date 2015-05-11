app.controller(
	"contentCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			var content = [];
			content = Restangular.all('content?format=json');

		}
	]
);
