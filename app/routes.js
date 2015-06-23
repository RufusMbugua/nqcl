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
      views: {
        '': {
          templateUrl: 'app/partials/home/index.html',
          controller: 'homeCtrl',
        },
        'main@public.home': {
          templateUrl: 'app/partials/home/main.html',
        },
        'news@public.home': {
          templateUrl: 'app/partials/articles/articles.items.widget.html',
          controller: 'contentCtrl'
        }
      }
    })
    .state('public.about', {
      url: '/about',
      templateUrl: 'app/partials/about/index.html',
      controller: 'aboutCtrl'
    })
    .state('public.downloads', {
      url: '/downloads',
      templateUrl: 'app/partials/files/index.html',
      controller: 'fileCtrl'
    })
    .state('public.downloads.add', {
      url: '/add',
      templateUrl: 'app/partials/files/add.html',
      controller: 'fileCtrl'
    })
    .state('public.downloads.list', {
      url: '/list',
      templateUrl: 'app/partials/files/list.html',
      controller: 'fileCtrl'
    })
    .state('public.services', {
      url: '/services',
      templateUrl: 'app/partials/services/index.html',
      controller: 'homeCtrl'
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
      views: {
        '': {
          templateUrl: 'app/partials/contact/index.html',
          controller: 'homeCtrl',
        },
        'email@public.contact': {
          templateUrl: 'app/partials/contact/email.html',
        },
        'directions@public.contact': {
          templateUrl: 'app/partials/contact/directions.html',
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/partials/admin/login.html',
      controller: 'usersCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: 'adminCtrl'
    })
    .state('admin.content', {
      url: '/content',
      views: {
        // Main
        '': {
          templateUrl: 'app/partials/content/content.html',
          controller: 'contentCtrl',
        },
        'header@admin.content': {
          templateUrl: 'app/partials/content/content.header.html',
        }
      }
    })
    .state('admin.content.main', {
      url: '/main',
      views: {
        '': {
          templateUrl: 'app/partials/content/content.main.html'
        }
      },
      controller: 'contentCtrl'
    })
    .state('admin.content.about', {
      url: '/about',
      views: {
        '': {
          templateUrl: 'app/partials/content/content.about.html'
        }
      },
      controller: 'contentCtrl'
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
    .state('admin.slides', {
      url: '/slides',
      views: {
        // Main
        '': {
          templateUrl: 'app/partials/slides/index.html',
          controller: 'fileCtrl',
        }

      }
    })
    .state('admin.slides.add', {
      url: '/add',
      templateUrl: 'app/partials/slides/add.html',
      controller: 'fileCtrl'
    })
    .state('admin.slides.list', {
      url: '/list',
      templateUrl: 'app/partials/slides/list.html',
      controller: 'fileCtrl'
    })
    .state('admin.files', {
      url: '/files',
      views: {
        // Main
        '': {
          templateUrl: 'app/partials/files/index.html',
          controller: 'fileCtrl',
        }

      }
    })
    .state('admin.files.add', {
      url: '/add',
      templateUrl: 'app/partials/files/add.html',
      controller: 'fileCtrl'
    })
    .state('admin.files.list', {
      url: '/list',
      templateUrl: 'app/partials/files/list.html',
      controller: 'fileCtrl'
    })
    .state('admin.articles', {
      url: '/articles',
      views: {
        // Main
        '': {
          templateUrl: 'app/partials/articles/index.html',
          controller: 'contentCtrl',
        },
        'header@admin.articles': {
          templateUrl: 'app/partials/admin/header.html'
        }

      }
    })
    .state('admin.articles.add', {
      url: '/add',
      templateUrl: 'app/partials/articles/articles.add.html'
    })
    .state('admin.articles.edit', {
      url: '/edit',
      templateUrl: 'app/partials/articles/articles.add.html'
    })
    .state('admin.articles.published', {
      url: '/published',
      views: {
        '': {
          templateUrl: 'app/partials/articles/articles.published.html'
        },
        'list@admin.articles.published': {
          templateUrl: 'app/partials/articles/articles.list.html'
        },
        'detail@admin.articles.published': {
          templateUrl: 'app/partials/articles/articles.items.html'
        }
      }
    })
    .state('admin.users',{
      url:'/users',
      views:{
        '':{
          templateUrl:'app/partials/users/index.html',
          controller:'usersCtrl'
        }
      }
    }).
    state('admin.users.add',{
      url:'/add',
      views:{
        '':{
          templateUrl:'app/partials/users/new-profile.html',
          controller:'usersCtrl'
        }
      }
    }).
    state('admin.users.view',{
      url:'/view',
      views:{
        '':{
          templateUrl:'app/partials/users/view.html',
          controller:'usersCtrl'
        },
        'profile@admin.users.view':{
          templateUrl:'app/partials/users/profile.html'
        },
        'admin-panel@admin.users.view':{
          templateUrl:'app/partials/users/admin-panel.html'
        }
      }
    })
    ;
});
