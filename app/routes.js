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
		})
		.state('content', {
			url: '/content',
			views: {
				// Main
				'': {
					templateUrl: 'app/partials/content/content.html'
				},
				'table@content': {
					templateUrl: 'app/partials/content/table.html',
					controller: 'contentCtrl'
				},
				'menu@content': {
					templateUrl: 'app/partials/content/menu.html',
					controller: 'contentCtrl'
				}
			}
		})
		.state('articles', {
			url: '/articles',
			views: {
				// Main
				'': {
					templateUrl: 'app/partials/articles/index.html',
					controller: 'contentCtrl'
				}
			}
		})
		.state('articles.add', {
			url: '/add',
			controller: 'contentCtrl',
			templateUrl: 'app/partials/articles/articles.add.html'
		})
		.state('articles.published', {
			url: '/published',
			views: {
				'': {
					templateUrl: 'app/partials/articles/articles.published.html',
					controller: 'contentCtrl'
				},
				'list@articles.published': {
					templateUrl: 'app/partials/articles/articles.list.html',
					controller: 'contentCtrl'
				},
				'detail@articles.published': {
					templateUrl: 'app/partials/articles/articles.items.html',
					controller: 'contentCtrl'
				}
			}
		});
});
