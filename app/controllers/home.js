app.controller(
	"homeCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			var front = Restangular.all('front?format=json');
			loadImages();
			loadContent();
			scope.content = [];

			function loadImages() {
				scope.slides = [{
					image: 'app/images/slides/1.png',
					text: ''
				}, {
					image: 'app/images/slides/2.png',
					text: ''
				}, {
					image: 'app/images/slides/3.png',
					text: ''
				}];
			}


			function loadContent() {
				front.getList().then(function(content) {

					angular.forEach(content, function(value, key) {
						switch (value.data_type) {
							case "WELCOME TO NQCL":
								scope.content.welcome = value;
								break;
							case "OUR SERVICES":
								scope.content.services = value;
								break;
							case "CUSTOMERS WHO TRUST IN US":
								scope.content.customers = value;
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
