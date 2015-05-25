var app = angular.module("nqcl", ['ui.router', 'restangular', 'smart-table',
	'chart.js', 'angularMoment', 'ui.bootstrap', 'ngSanitize', 'angular-md5',
	'LocalStorageModule', 'froala', 'ngFileUpload'
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
		rootScope.level = 'public';
	}
]);
app.value('froalaConfig', {
	inlineMode: false,
	placeholder: 'Enter Text Here'
});
;app.controller(
	"aboutCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			scope.links = [];
			loadLinks();

			function loadLinks() {
				var Links = Restangular.all('about?format=json');
				Links.getList().then(function(links) {
					scope.links = links;
				});
			}

			scope.loadContent = function loadContent(content) {
				scope.content = content
			}
		}
	]
);
;app.controller(
	"adminCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		'Session',
		function(scope, filter, timeout, state, Restangular, Session) {
			var status;
			redirect();
			checkCurrent();

			function redirect() {
				status = Session.checkIfLogged();
				if (status == 'false') {
					state.go('login');
				} else if (status == 'true') {
					state.go('admin.content');
				} else {

				}
			}

			function checkCurrent() {
				var current = Session.identify();
			}
		}
	]
);
;app.controller(
  "contactCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    function(scope, filter, timeout, state, Restangular) {
      scope.content = [];
      var front = Restangular.all('content/content?format=json');
      loadContent();

      function loadContent() {
        front.getList().then(function(content) {

          angular.forEach(content, function(value, key) {
            switch (value.name) {
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
;app.controller(
  "contentCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    '$http',
    function(scope, filter, timeout, state, Restangular, http) {
      /**
       * [Pages description]
       * @type {[type]}
       */
      var Pages = Restangular.all('pages?format=json');

      /**
       * [article description]
       * @type {[type]}
       */
      var Articles = Restangular.all('news?format=json');

      /**
       * [menu description]
       * @type {Array}
       */
      scope.menu = [];

      /**
       * [article_menu description]
       * @type {Array}
       */
      scope.article_menu = [];

      /**
       * [content description]
       * @type {Array}
       */
      scope.content = [];

      scope.alerts = [];

      // getMenuItems();
      loadSiteContent();
      loadArticles();

      setArticleMenu();


      /**
       * [loadArticles description]
       */
      function loadArticles() {
        scope.list = [];
        http.get('news?format=json').
        success(function(data, status, headers, config) {
          scope.list = data;
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
        // Articles.customGET().then(function(article) {
        // 	scope.list = article;
        // });
      }


      /**
       * [setArticleMenu description]
       */
      function setArticleMenu() {
        article_menu = [{
          'name': 'Add',
          'ui_sref': 'admin.articles.add',
          'icon_class': 'fa fa-plus'
        }, {
          'name': 'Published',
          'ui_sref': 'admin.articles.published',
          'icon_class': 'fa fa-newspaper-o'
        }];

        scope.article_menu = article_menu;
      }

      /**
       * [addArticle description]
       */
      scope.addArticle = function addArticle() {
        Articles.post(scope.article).then(function(response) {
          var alert = {
            type: 'success',
            msg: response
          }
          scope.alerts.push(alert);
          timeout(function() {
            state.go('admin.articles.published')
          }, 1000);
        });
      }

      /**
       * [editArticle description]
       */
      scope.editArticle = function editArticle(item) {
        scope.article = item;

      }

      /**
       * [disableArticle description]
       */
      scope.disableArticle = function disableArticle() {

      }

      /**
       * [closeAlert description]
       * @param {[type]} index [description]
       */
      scope.closeAlert = function(index) {
        scope.alerts.splice(index, 1);
      };

      scope.editSiteContent = function editSiteContent(content) {
        Pages.customPUT(content);
      }

      scope.disableSiteContent = function disableSiteContent(content) {
          console.log(Pages);
          Pages.customDELETE(content);
        }
        // Content

      /**
       * [loadSiteContent description]
       */
      function loadSiteContent() {
        scope.content = [];
        Pages.customGET().then(function(content) {
          scope.content = content;
        });
      }

    }
  ]);
;app.controller(
	"fileCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		'Upload', '$rootScope',

		function(scope, filter, timeout, state, Restangular, Upload, rootScope) {
			Files = Restangular.all('Files?format=json');
			loadFileList();
			scope.progress = [];

			function loadFileList() {
				Files.customGET().then(function(files) {
					console.log(files);
					scope.files = files;
				});
			}


			scope.$watch('files', function() {
				scope.upload(scope.files);
			});

			scope.upload = function(files) {
				console.log(Upload);
				if (files && files.length) {
					for (var i = 0; i < files.length; i++) {
						var file = files[i];
						Upload.upload({
							url: 'files',
							fields: {
								'username': rootScope.user.f_name
							},
							file: file
						}).progress(function(evt) {
							var progressPercentage = parseInt(100.0 * evt.loaded /
								evt.total);
							console.log('progress: ' + progressPercentage + '% ' +
								evt.config.file
								.name);
							scope.progress.percentage = progressPercentage;
							scope.progress.file = evt.config.file.name;

						}).success(function(data, status, headers, config) {
							console.log('file ' + config.file.name +
								'uploaded. Response: ' +
								data);
						});
					}
				}
			};
		}
	]
);
;app.controller(
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
          console.log(content);
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
;app.controller(
	"usersCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		'md5', 'localStorageService', '$rootScope',

		function(scope, filter, timeout, state, Restangular, md5,
			localStorageService, rootScope) {
			var users = Restangular.all('users');
			var user = [];

			scope.login = function login() {
				scope.user.password = md5.createHash(scope.user.password || '');
				users.post(scope.user).then(function(response) {
					localStorageService.set('user', response);
					rootScope.user = response;
					state.go('admin');
				});
			}

		}
	]
);
;app.directive("mainHeader", function() {
	return {
		templateUrl: "app/partials/globals/header.html"
	}
});

// app.directive("adminHeader", function() {
//   return {
//     templateUrl: "app/partials/admin/header.html"
//   }
// });
app.directive("secondaryHeader", function() {
	return {
		templateUrl: "app/partials/globals/secondary_header.html"
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
;app.config(function($stateProvider, $urlRouterProvider) {
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
			templateUrl: 'app/partials/contact/index.html',
			controller: 'homeCtrl'
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
				'table@admin.content': {
					templateUrl: 'app/partials/content/table.html'
				},
				'menu@admin.content': {
					templateUrl: 'app/partials/content/menu.html'
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
			templateUrl: 'app/partials/articles/articles.add.html',
			controller: 'contentCtrl'
		})
		.state('admin.articles.published', {
			url: '/published',
			views: {
				'': {
					templateUrl: 'app/partials/articles/articles.published.html',
					controller: 'contentCtrl'
				},
				'list@admin.articles.published': {
					templateUrl: 'app/partials/articles/articles.list.html'
				},
				'detail@admin.articles.published': {
					templateUrl: 'app/partials/articles/articles.items.html'
				}
			}
		});
});
;app.factory('Session', ['localStorageService', '$rootScope', '$state', function(
  localStorageService, rootScope, state) {
  var Session = {};

  Session.checkIfLogged = function checkIfLogged() {
    rootScope.user = [];
    user = localStorageService.get('user');
    if (user == null) {
      rootScope.user = null;
      rootScope.level = 'public'
      status = 'false';
    } else {
      rootScope.user = user;
      rootScope.level = 'admin'
      status = 'true';
    }
    return status;

  }

  Session.identify = function identify() {
    var currentState = state.current;

    if (currentState.name == 'logout') {
      destroy();
      state.go('public.home');
    }
    return 'Done';
  }

  function destroy() {
    rootScope.user = null;
    localStorageService.remove('user');
  }
  return Session;

}]);
;angular.module('templates-dist', ['../app/partials/about/index.html', '../app/partials/admin/header.html', '../app/partials/admin/index.html', '../app/partials/admin/login.html', '../app/partials/articles/articles.add.html', '../app/partials/articles/articles.items.html', '../app/partials/articles/articles.list.html', '../app/partials/articles/articles.published.html', '../app/partials/articles/index.html', '../app/partials/contact/index.html', '../app/partials/content/content.detail.html', '../app/partials/content/content.html', '../app/partials/content/menu.html', '../app/partials/content/table.html', '../app/partials/files/add.html', '../app/partials/files/index.html', '../app/partials/files/list.html', '../app/partials/globals/carousel.html', '../app/partials/globals/secondary_header.html', '../app/partials/home/index.html', '../app/partials/news/index.html', '../app/partials/public/header.html', '../app/partials/public/index.html', '../app/partials/services/index.html']);

angular.module("../app/partials/about/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/about/index.html",
    "<div id=\"side-menu\">\n" +
    "  <nav>\n" +
    "    <li ng-repeat=\"link in links\">\n" +
    "      <a href=\"\" ng-click=loadContent(link.about_body)>{{link.about_type}}</a>\n" +
    "    </li>\n" +
    "  </nav>\n" +
    "</div>\n" +
    "<div id=\"side-content\" ng-bind-html='content'>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/admin/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/admin/header.html",
    "<nav id=\"admin\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "      <ul>\n" +
    "        <!-- <li>\n" +
    "        <a is-active-nav ui-sref=\"home\" >Dashboard</a>\n" +
    "      </li> -->\n" +
    "      <li>\n" +
    "        <a is-active-nav ui-sref=\"admin.content\" ><i class='fa fa-list-ul'></i>Page Content</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a is-active-nav ui-sref=\"admin.articles\" ><i class='fa fa-list-ul'></i>Articles</a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a is-active-nav ui-sref=\"admin.files.add\" ><i class='ion-document'></i>Files</a>\n" +
    "      </li>\n" +
    "\n" +
    "    </ul>\n" +
    "\n" +
    "    <ul class=\"navbar-right\">\n" +
    "      <li>\n" +
    "        <a>\n" +
    "          <i class='fa fa-user'></i>\n" +
    "          <span>{{user[0].f_name}}</span>\n" +
    "          <span>{{user[0].l_name}}</span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li><a href=\"#\" is-active-nav ui-sref=\"logout\"><i class='fa fa-sign-out'></i>Logout</a></li>\n" +
    "\n" +
    "    </ul>\n" +
    "  </div><!-- /.navbar-collapse -->\n" +
    "</div><!-- /.container-fluid -->\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../app/partials/admin/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/admin/index.html",
    "<admin-header ui-view=\"header\">\n" +
    "\n" +
    "\n" +
    "</admin-header>\n" +
    "\n" +
    "<section ui-view id=\"content\">\n" +
    "\n" +
    "</section>\n" +
    "");
}]);

angular.module("../app/partials/admin/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/admin/login.html",
    "<div id=\"login\">\n" +
    "  <h2>NQCL Admin Login </h2>\n" +
    "  <form id=\"login-form\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"exampleInputEmail1\">Email address</label>\n" +
    "      <input type=\"email\" ng-model=\"user.email\" class=\"form-control\" name=\"mail_address\" required=\"required\" placeholder=\"Email\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"exampleInputEmail1\">Password</label>\n" +
    "      <input type=\"password\" ng-model=\"user.password\" class=\"form-control\" name=\"password\" required=\"required\" placeholder=\"Password\"\n" +
    "      />\n" +
    "    </div>\n" +
    "    <input type=\"submit\" class=\"btn\" name=\"sender\" value=\"SUBMIT\" ng-click=\"login()\"/>\n" +
    "\n" +
    "    <p><center><a href=\"#\">Forgot your password?</a></center></p>\n" +
    "  </form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/articles/articles.add.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/articles/articles.add.html",
    "<div class=\"content full\">\n" +
    "  <form action=\"\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>Title</label>\n" +
    "      <div class=\"input-group\">\n" +
    "        <span class=\"input-group-addon\"><i class=\"fa fa-header\"></i></span>\n" +
    "        <input ng-model=\"article.title\" class=\"form-control\" required=\"required\" placeholder=\"Title\" />\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <label>Body</label>\n" +
    "    <textarea froala ng-model=\"article.body\"></textarea>\n" +
    "    <!-- <textarea froala rows=\"5\" ng-model=\"article.body\" class=\"form-control\"  required=\"required\" placeholder=\"Body\"></textarea> -->\n" +
    "\n" +
    "\n" +
    "    <div class=\"form-group\">\n" +
    "      <label>Type</label>\n" +
    "      <div class=\"input-group\">\n" +
    "        <span class=\"input-group-addon\" id=\"basic-addon1\"><i class=\"fa fa-tag\"></i></span>\n" +
    "        <input ng-model=\"article.type\" class=\"form-control\"  required=\"required\" placeholder=\"Type\" />\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <a href=\"\" class=\"btn btn-add\" ng-click=\"addArticle()\"><i class='fa fa-plus'></i>Add Article</a>\n" +
    "  </form>\n" +
    "\n" +
    "  <alert ng-repeat=\"alert in alerts\" type=\"{{alert.type}}\" close=\"closeAlert($index)\">{{alert.msg}}</alert>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/articles/articles.items.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/articles/articles.items.html",
    "<h2><i class='ion-ios-paper'></i>News and Articles</h2>\n" +
    "<div ng-repeat=\"(year,months) in list track by $index\" ng-if=\"$last\">\n" +
    "  <div ng-repeat=\"(month,articles) in months track by $index\" ng-if=\"$last\">\n" +
    "    <div ng-repeat=\"item in articles track by $index | orderBy:time_posted : reverse\" class=\"news-item\">\n" +
    "      <h3>{{item.title}}\n" +
    "        <span class=\"label label-danger\" ng-if=\"item.new\">\n" +
    "          New\n" +
    "        </span>\n" +
    "        <span class=\"article-actions\" ng-if=\"(level == 'admin')\">\n" +
    "          <a href=\"\" ng-click=\"editArticle(item)\"><i class=\"ion-edit\"></i></a>\n" +
    "          <a href=\"\" ng-click=\"disableArticle(item)\"><i class=\"ion-minus-circled\"></i></a>\n" +
    "        </span>\n" +
    "      </h3>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"news-item-content\" ng-bind-html=\"item.body\"></div>\n" +
    "        <div class=\"news-item-type\"><i class=\"fa fa-tag\"></i>{{item.type}}</div>\n" +
    "        <div class=\"news-item-date\"><i class='fa fa-calendar'></i>{{item.time_posted}}</div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "<div ng-if=\"!content\">\n" +
    "  No articles for now.\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/articles/articles.list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/articles/articles.list.html",
    "<nav>\n" +
    "  <h3><i class=\"fa fa-archive\"></i>Archive</h3>\n" +
    "  <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n" +
    "    <div class=\"panel panel-default\" ng-repeat=\"(year,months) in list track by $index | orderBy: year : reverse\">\n" +
    "      <div class=\"panel-heading main-heading\" role=\"tab\" id=\"heading_{{$index}}\">\n" +
    "        <h4 class=\"panel-title\">\n" +
    "          <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#{{year}}\" aria-controls=\"{{year}}\">\n" +
    "            {{year}}\n" +
    "          </a>\n" +
    "        </h4>\n" +
    "      </div>\n" +
    "      <div id=\"{{year}}\" class=\"panel-collapse collapse in\" role=\"tabpanel\">\n" +
    "        <div class=\"panel-body\">\n" +
    "\n" +
    "          <div class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n" +
    "            <div class=\"panel panel-default sub-panel\" ng-repeat=\"(month,articles) in months track by $index\">\n" +
    "              <div class=\"panel-heading sub-heading\" role=\"tab\" id=\"heading_month_{{$index}}\">\n" +
    "                <h4 class=\"panel-title\" >\n" +
    "                  <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#{{month}}\" aria-controls=\"{{month}}\">\n" +
    "                    {{month}}\n" +
    "                  </a>\n" +
    "                </h4>\n" +
    "              </div>\n" +
    "              <div id=\"{{month}}\" class=\"panel-collapse collapse in\" role=\"tabpanel\">\n" +
    "                <div class=\"panel-body\">\n" +
    "                  <li ng-repeat=\"article in articles\">\n" +
    "                    <a href=\"\">{{article.title}}</a>\n" +
    "                  </li>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../app/partials/articles/articles.published.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/articles/articles.published.html",
    "<!--  -->\n" +
    "<div id=\"side-content\" ui-view=\"detail\">\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!--  -->\n" +
    "<div id=\"side-menu\" ui-view=\"list\">\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/articles/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/articles/index.html",
    "<secondary-header></secondary-header>\n" +
    "<div ui-view></div>\n" +
    "");
}]);

angular.module("../app/partials/contact/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/contact/index.html",
    "<div class=\"row\">\n" +
    "\n" +
    "  <section id=\"map\">\n" +
    "\n" +
    "    <script type=\"text/javascript\">\n" +
    "    var google;\n" +
    "\n" +
    "    if(google){\n" +
    "      var LGS=new google.maps.LatLng(-1.303227,36.807026);\n" +
    "      function initialize()\n" +
    "      {\n" +
    "        var mapProp = {\n" +
    "          center:new google.maps.LatLng(-1.303227,36.807026),\n" +
    "          zoom:15,\n" +
    "          mapTypeId:google.maps.MapTypeId.ROADMAP\n" +
    "        };\n" +
    "        var map=new google.maps.Map(document.getElementById(\"map_canvas\")\n" +
    "        ,mapProp);\n" +
    "        var marker=new google.maps.Marker({position:LGS,});\n" +
    "\n" +
    "        marker.setMap(map);\n" +
    "        var infowindow1 = new google.maps.InfoWindow({\n" +
    "          content:'<div id=\"MapLocation\"><b>National Quality Control Laboratory</b></p>P.O. Box 29726 - 00202 KNH, Nairobi</div>'\n" +
    "        });\n" +
    "\n" +
    "        infowindow1.open(map,marker);\n" +
    "      }\n" +
    "\n" +
    "\n" +
    "      google.maps.event.addDomListener(window, 'load', initialize);\n" +
    "    }\n" +
    "    </script>\n" +
    "\n" +
    "    <div id=\"map_canvas\">\n" +
    "\n" +
    "    </div>\n" +
    "  </section>\n" +
    "  <section class=\"full content\" ng-bind-html=\"content.contact.content[0].body\">\n" +
    "\n" +
    "\n" +
    "  </section>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/content/content.detail.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/content/content.detail.html",
    "IMG\n" +
    "<div ui-view=\"table\">\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/content/content.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/content/content.html",
    "<!-- <div id=\"side-menu\" ui-view=\"menu\">\n" +
    "\n" +
    "</div> -->\n" +
    "<div id=\"full content\" ui-view=\"table\">\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/content/menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/content/menu.html",
    "<nav>\n" +
    "    <li><a href=\"\" ng-click=\"getMenuItems()\">Menu Links</a></li>\n" +
    "    <li><a href=\"\" ng-click=\"loadSiteContent()\">Site Content</a></li>\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../app/partials/content/table.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/content/table.html",
    "<table>\n" +
    "  <thead>\n" +
    "    <th>Name</th>\n" +
    "    <th>Body</th>\n" +
    "    <th>Active</th>\n" +
    "    <th>Action</th>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"item in content\">\n" +
    "      <td>{{item.name}}</td>\n" +
    "      <td>\n" +
    "        <textarea froala ng-model=\"item.content[0].body\" ng-bind-html=\"item.body\"></textarea></td>\n" +
    "      <td>{{item.active}}</td>\n" +
    "      <td>\n" +
    "        <div class=\"btn-group btn-group-sm\">\n" +
    "          <a href=\"\" class=\"btn btn-warning\" ng-click=\"editSiteContent(item)\">Edit</a>\n" +
    "          <a href=\"\" class=\"btn btn-danger\" ng-click=\"disableSiteContent(item)\">Disable</a>\n" +
    "        </div>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "  <tfoot><td></td></tfoot>\n" +
    "</table>\n" +
    "");
}]);

angular.module("../app/partials/files/add.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/files/add.html",
    "<div ng-controller=\"fileCtrl\">\n" +
    "\n" +
    "  <a class=\"btn btn-add\" ngf-multiple=\"true\" ngf-select ng-model=\"files\"><i class=\"fa fa-upload\"></i>Upload File</a>\n" +
    "  <a class=\"btn btn-view\" ui-sref=\"admin.files.list\" href=\"\"><i class=\"ion-eye\"></i>View Files</a>\n" +
    "  <!-- <div class=\"btn\" ngf-select ngf-change=\"upload($files)\">Upload on file change</div> -->\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"drop-box-container\">\n" +
    "      <div ngf-drop ng-model=\"files\" class=\"drop-box\"\n" +
    "      ngf-drag-over-class=\"dragover\" ngf-multiple=\"true\" ngf-allow-dir=\"true\"\n" +
    "      ngf-accept=\"'.jpg,.png,.pdf'\">Drop Images or PDFs files here</div>\n" +
    "      <div ngf-no-file-drop>File Drag/Drop is not supported for this browser</div>\n" +
    "    </div>\n" +
    "    <div class=\"image-thumbnail\">\n" +
    "      <h4>Image thumbnail:</h4>\n" +
    "      <img ngf-src=\"files[0]\" ngf-default-src=\"/thumb.jpg\">\n" +
    "      <div class=\"progress\">\n" +
    "        <div ng-init=\"progress.percentage=0\" class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"60\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: {{progress.percentage}}%;\">\n" +
    "          {{progress.percentage}}%\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      {{progress.file}}\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <!--   Audio preview: <audio controls ngf-src=\"files[0]\" ngf-accept=\"audio/*\"></audio>\n" +
    "  Video preview: <video controls ngf-src=\"files[0]\" ngf-accept=\"video/*\"></video> -->\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/files/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/files/index.html",
    "<div ui-view=\"header\"></div>\n" +
    "<div ui-view>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/files/list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/files/list.html",
    "<h3>Downloads Page\n" +
    "\n" +
    "<div class=\"btn-group btn-group\">\n" +
    "  <a href=\"\" class=\"btn btn-view\"><i class=\"ion-ios-list\"></i>List</a>\n" +
    "  <a href=\"\" class=\"btn btn-view\"><i class=\"ion-grid\"></i>Grid</a>\n" +
    "</div>\n" +
    "<a style=\"float:right\" href=\"\" ng-if=\"(level == 'admin')\" class=\"btn btn-add\" ui-sref=\"admin.files.add\"><i class='fa fa-plus'></i>Add File</a>\n" +
    "\n" +
    "</h3>\n" +
    "<table>\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>Name</th>\n" +
    "      <th>Source</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"file in files.data\" ng-if=\"file.name.path!=''\">\n" +
    "      <td>{{file.name.name}}</td>\n" +
    "      <td>\n" +
    "        <img class=\"img-responsive\" ng-if=\"file.mime == 'image/png' || file.mime == 'image/jpeg'\n" +
    "        \"src=\"{{file.uri}}\" alt=\"\">\n" +
    "\n" +
    "          <a ng-if=\"file.mime == 'application/pdf' \" href=\"{{file.uri}}\">{{file.name.name}}</a>\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "  <tfoot></tfoot>\n" +
    "</table>\n" +
    "");
}]);

angular.module("../app/partials/globals/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/globals/carousel.html",
    "");
}]);

angular.module("../app/partials/globals/secondary_header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/globals/secondary_header.html",
    "<nav id=\"secondary\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "      <ul>\n" +
    "        <li ng-repeat=\"item in article_menu\">\n" +
    "          <a is-active-nav ui-sref=\"{{item.ui_sref}}\" ><i class=\"{{item.icon_class}}\"></i>{{item.name}}</a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "    </div><!-- /.navbar-collapse -->\n" +
    "  </div><!-- /.container-fluid -->\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../app/partials/home/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/home/index.html",
    "<section id=\"carousel-container\">\n" +
    "  <carousel interval=\"2000\">\n" +
    "    <slide ng-repeat=\"slide in slides\" active=\"slide.active\">\n" +
    "      <img ng-src=\"{{slide.uri}}\" style=\"margin:auto;\">\n" +
    "      <div class=\"carousel-caption\">\n" +
    "        <p>{{slide.text}}</p>\n" +
    "      </div>\n" +
    "    </slide>\n" +
    "  </carousel>\n" +
    "</section>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "  <section class=\"content full\">\n" +
    "\n" +
    "    <h1>{{content.welcome.name}}</h1>\n" +
    "    <div class=\"description\" ng-bind-html=\"content.welcome.content[0].body\">\n" +
    "    </div>\n" +
    "  </section>\n" +
    "  <section class=\"content small\">\n" +
    "    <h1>{{content.services.name}}</h1>\n" +
    "    <div class=\"description\" ng-bind-html=\"content.services.content[0].body\">\n" +
    "    </div>\n" +
    "  </section>\n" +
    "  <section class=\"content small\">\n" +
    "    <h1>{{content.customers.name}}</h1>\n" +
    "    <div class=\"description\" ng-bind-html=\"content.customers.content[0].body\">\n" +
    "    </div>\n" +
    "  </section>\n" +
    "  <section class=\"content small\">\n" +
    "    <h1>{{content.contact.name}}</h1>\n" +
    "    <div class=\"description\" ng-bind-html=\"content.contact.content[0].body\"></div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/news/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/news/index.html",
    "<div id=\"side-content\">\n" +
    "  <h1>NEWS ARTICLES AND UPCOMING EVENTS</h1>\n" +
    "  <div ng-repeat=\"item in content\" class='news-item' >\n" +
    "      <h3>{{item.title}}</h3>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"news-item-content\" ng-bind-html=\"item.body\"></div>\n" +
    "        <div class=\"news-item-type\">{{item.type}}</div>\n" +
    "        <div class=\"news-item-date\">{{item.time_posted}}</div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div id=\"side-menu\">\n" +
    "  <h1>RECENT POSTS</h1>\n" +
    "  <nav>\n" +
    "    <li ng-repeat=\"item in content\">\n" +
    "      <a href=\"\">{{item.title}}</a>\n" +
    "    </li>\n" +
    "  </nav>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/public/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/public/header.html",
    "<div id=\"logo\">\n" +
    "  <img src=\"app/images/logo/MOH.png\"/>\n" +
    "  <h3>National Quality Control Lab for Drugs and Medical Services</h3>\n" +
    "  <img src=\"app/images//logo/NQCL_logo.png\" style=\"float:right\"/>\n" +
    "</div>\n" +
    "\n" +
    "<nav id=\"main\">\n" +
    "  <div class=\"container-fluid\">\n" +
    "    <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "        <span class=\"sr-only\">Toggle navigation</span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "        <span class=\"icon-bar\"></span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "    <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "      <ul>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"public.home\" >Home</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"public.about\" >About NQCL</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"public.services\" >Our Services</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"public.news\" >News and Events</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"public.downloads.list\">Downloads</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"public.contact\">Contact Us</a>\n" +
    "        </li>\n" +
    "\n" +
    "      </ul>\n" +
    "\n" +
    "      <ul class=\"navbar-right\">\n" +
    "        <li ng-if=\"user\" class='dropdown'>\n" +
    "          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n" +
    "            <i class='fa fa-user'></i>\n" +
    "            <span>{{user[0].f_name}}</span>\n" +
    "            <span>{{user[0].l_name}}</span>\n" +
    "            <span class=\"caret\"></span>\n" +
    "          </a>\n" +
    "          <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "            <li><a href=\"#\"><i class=\"ion-gear\"></i>Back to Admin Page</a></li>\n" +
    "          </ul>\n" +
    "        </li>\n" +
    "        <li ng-if=\"!user\"><a href=\"#\" is-active-nav ui-sref=\"login\"><i class=\"fa fa-sign-in\"></i>Login to CMS</a></li>\n" +
    "      </ul>\n" +
    "    </div><!-- /.navbar-collapse -->\n" +
    "  </div><!-- /.container-fluid -->\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../app/partials/public/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/public/index.html",
    "<admin-header ui-view=\"header\">\n" +
    "\n" +
    "\n" +
    "</admin-header>\n" +
    "\n" +
    "<section ui-view id=\"public-content\">\n" +
    "\n" +
    "</section>\n" +
    "");
}]);

angular.module("../app/partials/services/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/services/index.html",
    "<div class=\"row\">\n" +
    "\n" +
    "  <section class=\"content full\" ng-bind-html=\"content.services.content[0].body\">\n" +
    "  </section>\n" +
    "</div>\n" +
    "");
}]);
