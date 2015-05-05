app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

  // Now set up the states
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/partials/home/index.html',
      controller: 'homeCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'app/partials/about/index.html',
      controller: 'aboutCtrl'
    })
    .state('services', {
      url: '/services',
      templateUrl: 'app/partials/services/index.html',
      controller: 'servicesCtrl'
    })
    .state('news', {
      url: '/news',
      templateUrl: 'app/partials/news/index.html',
      controller: 'newsCtrl'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'app/partials/contact/index.html',
      controller: 'contactCtrl'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/partials/admin/index.html',
      controller: 'adminCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/partials/admin/login.html',
      controller: 'usersCtrl'
    });
});
