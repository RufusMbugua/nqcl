var app = angular.module("nqcl", ['ui.router', 'restangular', 'smart-table',
	'chart.js', 'angularMoment', 'ui.bootstrap', 'ngSanitize', 'angular-md5',
	'LocalStorageModule'
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
		function(scope, filter, timeout, state, Restangular) {


		}
	]
);
;app.controller(
	"contactCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
		function(scope, filter, timeout, state, Restangular) {
			scope.content = [];
			var front = Restangular.all('front?format=json');
			loadContent();

			function loadContent() {
				front.getList().then(function(content) {

					angular.forEach(content, function(value, key) {
						switch (value.data_type) {
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
;app.controller(
  "newsCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    function(scope, filter, timeout, state, Restangular) {

      loadContent();

      function loadContent() {
        var Content = Restangular.all('news?format=json');
        Content.getList().then(function(content) {
          scope.content = content;
        });
      }
    }
  ]
);
;app.controller(
  "servicesCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    function(scope, filter, timeout, state, Restangular) {
      scope.links = [];
      loadContent();

      function loadContent() {
        var Content = Restangular.all('services?format=json');
        Content.getList().then(function(content) {
          console.log(content);
          scope.content = content[0];
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
        });
      }

    }
  ]
);
;app.directive("header", function() {
  return {
    templateUrl: "app/partials/globals/header.html"
  }
});

app.directive("adminHeader", function() {
  return {
    templateUrl: "app/partials/admin/header.html"
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
;app.factory('Session', ['localStorageService', '$rootScope', function(
	localStorageService, rootScope) {

	return {
		checkIfLogged: function checkIfLogged() {
			rootScope.user = [];
			user = localStorageService.get('user');
			console.log(user);
			if (user == null) {
				rootScope.user = null;
				status = 'Not Logged In';
			} else {
				rootScope.user = user;
				status = 'Logged In';
			}

		}
	}

}]);
;angular.module('templates-dist', ['../app/partials/about/index.html', '../app/partials/admin/header.html', '../app/partials/admin/index.html', '../app/partials/admin/login.html', '../app/partials/contact/index.html', '../app/partials/globals/carousel.html', '../app/partials/globals/header.html', '../app/partials/home/index.html', '../app/partials/news/index.html', '../app/partials/services/index.html']);

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
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"home\" >Dashboard</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"content\" ><i class='fa fa-list-ul'></i>Content</a>\n" +
    "        </li>\n" +
    "\n" +
    "\n" +
    "      </ul>\n" +
    "\n" +
    "      <ul class=\"navbar-right\">\n" +
    "        <li><a href=\"#\" is-active-nav ui-sref=\"login\"><i class='fa fa-sign-out'></i>Logout</a></li>\n" +
    "      </ul>\n" +
    "    </div><!-- /.navbar-collapse -->\n" +
    "  </div><!-- /.container-fluid -->\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../app/partials/admin/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/admin/index.html",
    "<!-- Here we are -->\n" +
    "<adminheader>\n" +
    "\n" +
    "\n" +
    "</adminheader>\n" +
    "");
}]);

angular.module("../app/partials/admin/login.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/admin/login.html",
    "<form id=\"login-form\">\n" +
    "\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"exampleInputEmail1\">Email address</label>\n" +
    "    <input type=\"email\" ng-model=\"user.email\" class=\"form-control\" name=\"mail_address\" required=\"required\" placeholder=\"Email\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"exampleInputEmail1\">Password</label>\n" +
    "    <input type=\"password\" ng-model=\"user.password\" class=\"form-control\" name=\"password\" required=\"required\" placeholder=\"Password\"\n" +
    "    />\n" +
    "  </div>\n" +
    "  <input type=\"submit\" class=\"btn\" name=\"sender\" value=\"SUBMIT\" ng-click=\"login()\"/>\n" +
    "\n" +
    "  <p><center><a href=\"#\">Forgot your password?</a></center></p>\n" +
    "</form>\n" +
    "");
}]);

angular.module("../app/partials/contact/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/contact/index.html",
    "<div class=\"row\">\n" +
    "\n" +
    "  <section id=\"map\">\n" +
    "\n" +
    "  <script type=\"text/javascript\">\n" +
    "  var LGS=new google.maps.LatLng(-1.303227,36.807026);\n" +
    "  function initialize()\n" +
    "  {\n" +
    "    var mapProp = {\n" +
    "      center:new google.maps.LatLng(-1.303227,36.807026),\n" +
    "      zoom:15,\n" +
    "      mapTypeId:google.maps.MapTypeId.ROADMAP\n" +
    "    };\n" +
    "    var map=new google.maps.Map(document.getElementById(\"map_canvas\")\n" +
    "    ,mapProp);\n" +
    "    var marker=new google.maps.Marker({position:LGS,});\n" +
    "\n" +
    "    marker.setMap(map);\n" +
    "    var infowindow1 = new google.maps.InfoWindow({\n" +
    "      content:'<div id=\"MapLocation\"><b>National Quality Control Laboratory</b></p>P.O. Box 29726 - 00202 KNH, Nairobi</div>'\n" +
    "    });\n" +
    "\n" +
    "    infowindow1.open(map,marker);\n" +
    "  }\n" +
    "\n" +
    "  google.maps.event.addDomListener(window, 'load', initialize);\n" +
    "  </script>\n" +
    "\n" +
    "  <div id=\"map_canvas\">\n" +
    "\n" +
    "  </div>\n" +
    "</section>\n" +
    "<section class=\"full content\" ng-bind-html=\"content.contact.data_body\">\n" +
    "\n" +
    "\n" +
    "    </section>\n" +
    "\n" +
    "\n" +
    "\n" +
    "  </div>\n" +
    "");
}]);

angular.module("../app/partials/globals/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/globals/carousel.html",
    "");
}]);

angular.module("../app/partials/globals/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/globals/header.html",
    "<div id=\"logo\">\n" +
    "  <img src=\"app/images/logo/MOH.png\"/>\n" +
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
    "          <a is-active-nav ui-sref=\"home\" >Home</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"about\" >About NQCL</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"services\" >Our Services</a>\n" +
    "        </li>\n" +
    "\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"news\" >News and Events</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"downloads\">Downloads</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"contact\">Contact Us</a>\n" +
    "        </li>\n" +
    "\n" +
    "      </ul>\n" +
    "\n" +
    "      <ul class=\"navbar-right\">\n" +
    "        <li><a href=\"#\" is-active-nav ui-sref=\"login\"><i></i>Login</a></li>\n" +
    "        <li class=\"dropdown\">\n" +
    "          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">Dropdown <span class=\"caret\"></span></a>\n" +
    "          <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "            <li><a href=\"#\">Action</a></li>\n" +
    "            <li><a href=\"#\">Another action</a></li>\n" +
    "            <li><a href=\"#\">Something else here</a></li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li><a href=\"#\">Separated link</a></li>\n" +
    "          </ul>\n" +
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
    "      <img ng-src=\"{{slide.image}}\" style=\"margin:auto;\">\n" +
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
    "    <h1>{{content.welcome.data_type}}</h1>\n" +
    "    <div class=\"description\" ng-bind-html=\"content.welcome.data_body\">\n" +
    "    </div>\n" +
    "  </section>\n" +
    "  <section class=\"content small\">\n" +
    "    <h1>{{content.services.data_type}}</h1>\n" +
    "    <div class=\"description\" ng-bind-html=\"content.services.data_body\">\n" +
    "    </div>\n" +
    "  </section>\n" +
    "  <section class=\"content small\">\n" +
    "    <h1>{{content.customers.data_type}}</h1>\n" +
    "    <div class=\"description\" ng-bind-html=\"content.customers.data_body\">\n" +
    "    </div>\n" +
    "  </section>\n" +
    "  <section class=\"content small\">\n" +
    "    <h1>Contact Us</h1>\n" +
    "    <div class=\"description\"></div>\n" +
    "  </section>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/news/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/news/index.html",
    "<div id=\"side-content\">\n" +
    "  <h1>NEWS ARTICLES AND UPCOMING EVENTS</h1>\n" +
    "  <div ng-repeat=\"item in content\" class='news-item' >\n" +
    "      <h3>{{item.news_head}}</h3>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"news-item-content\" ng-bind-html=\"item.news_body\"></div>\n" +
    "        <div class=\"news-item-type\">{{item.news_type}}</div>\n" +
    "        <div class=\"news-item-date\">{{item.time_posted}}</div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div id=\"side-menu\">\n" +
    "  <h1>RECENT POSTS</h1>\n" +
    "  <nav>\n" +
    "    <li ng-repeat=\"item in content\">\n" +
    "      <a href=\"\">{{item.news_head}}</a>\n" +
    "    </li>\n" +
    "  </nav>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/services/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/services/index.html",
    "<div class=\"row\">\n" +
    "\n" +
    "  <section class=\"content full\" ng-bind-html=\"content.data_body\">\n" +
    "  </section>\n" +
    "</div>\n" +
    "");
}]);
