app.controller(
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
