var app = angular.module("nqcl", ['ui.router', 'restangular', 'smart-table',
	'chart.js', 'angularMoment', 'ui.bootstrap', 'ngSanitize'
]);
app.config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost/nqcl');
	RestangularProvider.setRequestSuffix('?format=json');
});
