angular.module('templates-dist', ['../app/partials/about/index.html', '../app/partials/admin/header.html', '../app/partials/admin/index.html', '../app/partials/admin/login.html', '../app/partials/articles/articles.add.html', '../app/partials/articles/articles.items.html', '../app/partials/articles/articles.list.html', '../app/partials/articles/articles.published.html', '../app/partials/articles/index.html', '../app/partials/contact/index.html', '../app/partials/content/content.detail.html', '../app/partials/content/content.html', '../app/partials/content/menu.html', '../app/partials/content/table.html', '../app/partials/globals/carousel.html', '../app/partials/globals/secondary_header.html', '../app/partials/home/index.html', '../app/partials/news/index.html', '../app/partials/public/header.html', '../app/partials/public/index.html', '../app/partials/services/index.html']);

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
    "          <a is-active-nav ui-sref=\"home\" >Dashboard</a>\n" +
    "        </li> -->\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"admin.content\" ><i class='fa fa-list-ul'></i>Page Content</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"admin.articles\" ><i class='fa fa-list-ul'></i>Articles</a>\n" +
    "        </li>\n" +
    "\n" +
    "\n" +
    "      </ul>\n" +
    "\n" +
    "      <ul class=\"navbar-right\">\n" +
    "        <li>\n" +
    "          <a>\n" +
    "            <i class='fa fa-user'></i>\n" +
    "            <span>{{user[0].f_name}}</span>\n" +
    "            <span>{{user[0].l_name}}</span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li><a href=\"#\" is-active-nav ui-sref=\"login\"><i class='fa fa-sign-out'></i>Logout</a></li>\n" +
    "      </ul>\n" +
    "    </div><!-- /.navbar-collapse -->\n" +
    "  </div><!-- /.container-fluid -->\n" +
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
    "<h2><i class='ion-ios-paper'></i>Latest Articles</h2>\n" +
    "<div ng-repeat=\"(year,months) in content track by $index\" ng-if=\"$last\">\n" +
    "  <div ng-repeat=\"(month,articles) in months track by $index\" ng-if=\"$last\">\n" +
    "    <div ng-repeat=\"item in articles track by $index | orderBy:time_posted : reverse\" class=\"news-item\">\n" +
    "      <h3>{{item.title}}\n" +
    "        <span class=\"label label-danger\" ng-if=\"item.new\">\n" +
    "          New\n" +
    "        </span>\n" +
    "        <span class=\"article-actions\">\n" +
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
    "    <div class=\"panel panel-default\" ng-repeat=\"(year,months) in content track by $index | orderBy: year : reverse\">\n" +
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
    "<div id=\"side-menu\" ui-view=\"menu\">\n" +
    "\n" +
    "</div>\n" +
    "<div id=\"side-content\" ui-view=\"table\">\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("../app/partials/content/menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/content/menu.html",
    "<nav>\n" +
    "    <li><a href=\"\">Menu Links</a></li>\n" +
    "    <li><a href=\"\">Site Content</a></li>\n" +
    "</nav>\n" +
    "");
}]);

angular.module("../app/partials/content/table.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../app/partials/content/table.html",
    "<table>\n" +
    "  <thead>\n" +
    "    <th>Name</th>\n" +
    "    <th>Order</th>\n" +
    "    <th>Linked Content</th>\n" +
    "    <th>Active</th>\n" +
    "    <th>Action</th>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"item in list\">\n" +
    "      <td>{{item.name}}</td>\n" +
    "      <td>{{item.order}}</td>\n" +
    "      <td>{{item.content_id}}</td>\n" +
    "      <td>{{item.active}}</td>\n" +
    "      <td>\n" +
    "        <div class=\"btn-group btn-group-sm\">\n" +
    "          <a href=\"\" class=\"btn btn-warning\">Edit</a>\n" +
    "          <a href=\"\" class=\"btn btn-danger\">Disable</a>\n" +
    "        </div>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "  <tfoot><td>Feet</td></tfoot>\n" +
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
    "          <a is-active-nav ui-sref=\"public.downloads\">Downloads</a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a is-active-nav ui-sref=\"public.contact\">Contact Us</a>\n" +
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
    "  <section class=\"content full\" ng-bind-html=\"content.data_body\">\n" +
    "  </section>\n" +
    "</div>\n" +
    "");
}]);
