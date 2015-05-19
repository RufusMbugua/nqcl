app.controller(
  "contentCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    '$http',
    function(scope, filter, timeout, state, Restangular, http) {
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
       * [Content description]
       * @type {RegExp}
       */
      var Content = Restangular.all('content/content?format=json');
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
       * [getMenuItems description]
       */
      function getMenuItems() {
        Menu.getList().then(function(menu) {
          scope.list = menu;
        });
      }

      /**
       * [loadArticles description]
       */
      function loadArticles() {
        http.get('news?format=json').
        success(function(data, status, headers, config) {
          scope.content = data;
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
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
            state.go('articles.published')
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


      // Content

      /**
       * [loadSiteContent description]
       */
      function loadSiteContent() {
        console.log(scope.list);
        scope.list = {};
        Content.getList().then(function(content) {
          scope.list = content;
          console.log(scope.list);
        });
      }

    }
  ]);
