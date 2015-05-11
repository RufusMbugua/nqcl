app.controller(
	"contentCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			menu = Restangular.all('content?format=json');
			scope.menu = [];
			getMenuItems();

			function getMenuItems() {
				console.log('Working');
				menu.getList().then(function(menu) {
					scope.list = menu;
				});
			}
		}
	]
);
