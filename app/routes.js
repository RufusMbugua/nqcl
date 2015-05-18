app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/public/home");

  // Now set up the states
  $stateProvider
    .state('public', {
      url: '/public',
      views: {
        '': {
          templateUrl: 'app/partials/public/index.html',
        },
        'header@public': {
          templateUrl: 'app/partials/public/header.html'
        }
      }
    })
    .state('public.home', {
      url: '/home',
      templateUrl: 'app/partials/home/index.html',
      controller: 'homeCtrl'
    })
    .state('public.about', {
      url: '/about',
      templateUrl: 'app/partials/about/index.html',
      controller: 'aboutCtrl'
    })
    .state('public.services', {
      url: '/services',
      templateUrl: 'app/partials/services/index.html',
      controller: 'servicesCtrl'
    })
    .state('public.news', {
      url: '/news',
      views: {
        '': {
          templateUrl: 'app/partials/articles/articles.published.html',
          controller: 'contentCtrl'
        },
        'list@public.news': {
          templateUrl: 'app/partials/articles/articles.list.html',
          controller: 'contentCtrl'
        },
        'detail@public.news': {
          templateUrl: 'app/partials/articles/articles.items.html',
          controller: 'contentCtrl'
        }
      }
    })
    .state('public.contact', {
      url: '/contact',
      templateUrl: 'app/partials/contact/index.html',
      controller: 'contactCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/partials/admin/login.html',
      controller: 'usersCtrl'
    })
    .state('admin.content', {
      url: '/content',
      views: {
        // Main
        '': {
          templateUrl: 'app/partials/content/content.html'
        },
        'table@admin.content': {
          templateUrl: 'app/partials/content/table.html',
          controller: 'contentCtrl'
        },
        'menu@admin.content': {
          templateUrl: 'app/partials/content/menu.html',
          controller: 'contentCtrl'
        }
      }
    })
    .state('admin', {
      url: '/admin',
      views: {
        // Main
        '': {
          templateUrl: 'app/partials/admin/index.html',
          controller: 'adminCtrl'
        },
        'header@admin': {
          templateUrl: 'app/partials/admin/header.html'
        }

      }
    })
    .state('admin.articles', {
      url: '/articles',
      views: {
        // Main
        '': {
          templateUrl: 'app/partials/articles/index.html',
          controller: 'contentCtrl'
        },
        'header@admin.articles': {
          templateUrl: 'app/partials/admin/header.html'
        }

      }
    })
    .state('admin.articles.add', {
      url: '/add',
      controller: 'contentCtrl',
      templateUrl: 'app/partials/articles/articles.add.html'
    })
    .state('admin.articles.published', {
      url: '/published',
      views: {
        '': {
          templateUrl: 'app/partials/articles/articles.published.html',
          controller: 'contentCtrl'
        },
        'list@admin.articles.published': {
          templateUrl: 'app/partials/articles/articles.list.html',
          controller: 'contentCtrl'
        },
        'detail@admin.articles.published': {
          templateUrl: 'app/partials/articles/articles.items.html',
          controller: 'contentCtrl'
        }
      }
    });
});
