app.controller(
	"newsCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {

			loadContent();

			function loadContent() {
				var Content = Restangular.all('news?format=json');
				Content.getList().then(function(content) {
					console.log(content);
					scope.content = content;
				});
			}
		}
	]
);
