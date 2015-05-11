app.controller(
	"contactCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			scope.content = [];
			var front = Restangular.all('front?format=json');
			loadContent();

			function loadContent() {
				front.getList().then(function(content) {

					angular.forEach(content, function(value, key) {
						switch (value.data_type) {
							case "Contact Us":
								scope.content.contact = value;
								break;

							default:

								break;

						}

					});
				});
			}
		}
	]
);
