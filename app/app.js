var app = angular.module("nqcl", ['ui.router', 'restangular', 'smart-table',
  'chart.js', 'angularMoment', 'ui.bootstrap', 'ngSanitize', 'angular-md5',
  'LocalStorageModule', 'froala'
]);
app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost/nqcl');
  // RestangularProvider.setRequestSuffix('?format=json');
});

app.config(function(localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageType('sessionStorage')
    .setPrefix('nqcl');
});

app.run(['localStorageService', '$rootScope', '$state', '$stateParams',
  'Session',
  function(localStorageService, rootScope, state, stateParams, Session) {
    Session.checkIfLogged();
  }
]);
app.value('froalaConfig', {
  inlineMode: false,
  placeholder: 'Enter Text Here'
});
