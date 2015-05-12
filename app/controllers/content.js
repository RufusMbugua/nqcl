app.controller(
  "contentCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    function(scope, filter, timeout, state, Restangular) {

      scope.myHtml = "<h1>Hello World</h1>"
      scope.froalaOptions = {
          buttons: ["bold", "italic", "underline", "sep", "align",
            "insertOrderedList", "insertUnorderedList"
          ]
        }
        /**
         * [menu description]
         * @type {[type]}
         */
      var Menu = Restangular.all('content?format=json');

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

      getMenuItems();

      loadArticles();

      setArticleMenu();
      /**
       * [getMenuItems description]
       */
      function getMenuItems() {
        Menu.getList().then(function(menu) {
          scope.list = menu;
        });
      }

      /**
       * [addArticle description]
       */
      scope.addArticle = function addArticle() {

        console.log(scope.article);

        Articles.post(scope.article).then(function(response) {
          console.log(response);
        });
      }


      /**
       * [loadArticles description]
       */
      function loadArticles() {
        var Content = Restangular.all('news?format=json');
        Content.getList().then(function(content) {
          scope.content = content;
        });
      }

      /**
       * [loadArticles description]
       */
      function setArticleMenu() {
        article_menu = [{
          'name': 'Add',
          'ui_sref': 'articles.add',
          'icon_class': 'fa fa-plus'
        }, {
          'name': 'Published',
          'ui_sref': 'articles.published',
          'icon_class': 'fa fa-newspaper-o'
        }];

        scope.article_menu = article_menu;
        console.log(article_menu);
      }
    }
  ]
);
