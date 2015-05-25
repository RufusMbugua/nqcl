app.controller(
	"homeCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			var front = Restangular.all('pages?format=json');

			var Slides = Restangular.all('files/slides?format=json')
			loadImages();
			loadContent();
			scope.content = [];

			function loadImages() {
				Slides.customGET().then(function(slides) {
					scope.slides = slides.data;
					console.log(slides.data);
				});
			}


			function loadContent() {

				front.getList().then(function(content) {
					angular.forEach(content, function(value, key) {
						switch (value.name) {
							case "Welcome to NQCL":
								scope.content.welcome = value;
								break;
							case "Our Services":
								scope.content.services = value;
								break;
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
