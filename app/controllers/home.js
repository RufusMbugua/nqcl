app.controller(
	"homeCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			loadImages();

			function loadImages() {
				scope.slides = [{
					image: 'app/images/slides/1.png',
					text: 'One'
				}, {
					image: 'app/images/slides/2.png',
					text: 'Two'
				}, {
					image: 'app/images/slides/3.png',
					text: 'Three'
				}];
			}
		}
	]
);
