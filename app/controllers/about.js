app.controller(
	"aboutCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			scope.links = [];
			loadLinks();

			function loadLinks() {
				var Links = Restangular.all('pages/about?format=json');
				Links.getList().then(function(links) {
					scope.links = links;
					console.log(links);
					scope.content = links[0]['about_body'];
				});
			}

			scope.loadContent = function loadContent(content) {
				scope.content = content
			}
		}
	]
);
