app.directive("header", function() {
	return {
		templateUrl: "app/partials/globals/header.html"
	}
});

// app.directive("carousel", function() {
//   return {
//     templateUrl: "app/partials/globals/carousel.html"
//   }
// });
app.directive('isActiveNav', ['$location', function($location) {
	return {
		restrict: 'A',
		link: function(scope, element) {
			scope.location = $location;
			scope.$watch('location.path()', function(currentPath) {

				if ('#' + currentPath == element[0].hash) {
					element.parent().addClass('active');
				} else {
					element.parent().removeClass('active');
				}
			});
		}
	};
}]);
