app.controller(
  "contentCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    '$http',
    function(scope, filter, timeout, state, Restangular, http) {

      scope.froalaOptions = {
          toolbarFixed: false
        }
        /**
         * [Pages description]
         * @type {[type]}
         */
      var Pages = Restangular.all('pages?format=json');

      /**
       * [About description]
       * @type {RegExp}
       */
      var About = Restangular.all('pages/about?format=json');
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
      scope.article = {};
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
      loadAboutContent()

      /**
       * [loadArticles description]
       */
      function loadArticles() {
        scope.action = 'add';
        scope.list = [];
        http.get('news?format=json').
        success(function(data, status, headers, config) {
          scope.list = data;
        }).
        error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      }
      scope.resetArticle = function resetArticle() {
        scope.article = [];
        scope.action = 'add';
        state.go('admin.articles.add');
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

        scope.menu = article_menu;
      }

      /**
       * [addArticle description]
       */
      scope.addArticle = function addArticle() {
        console.log(scope.article)
        Articles.post(scope.article).then(function(response) {
          var alert = {
            type: 'success',
            msg: response
          }
          scope.alerts.push(alert);
          timeout(function() {
            state.go(state.current, {}, {
              reload: true
            });
          }, 1000);
        });
      }

      /**
       * [editArticle description]
       */
      scope.getArticle = function getArticle(newArticle) {
        scope.article = newArticle;
        scope.action = 'edit';
        state.go('admin.articles.edit');

      }

      scope.editArticle = function editArticle() {
        scope.article.request = 'update';
        Articles.customPUT(scope.article).then(function(response) {
          timeout(function() {
            state.go(state.current, {}, {
              reload: true
            });
          }, 1000);
        });

      }

      /**
       * [disableArticle description]
       */
      scope.disableArticle = function disableArticle(article) {
        article.request = 'delete';
        Articles.customPUT(article).then(function(response) {
          timeout(function() {
            state.go(state.current, {}, {
              reload: true
            });
          }, 1000);
        });
      }

      /**
       * [closeAlert description]
       * @param {[type]} index [description]
       */
      scope.closeAlert = function(index) {
        scope.alerts.splice(index, 1);
      };

      scope.editSiteContent = function editSiteContent(content) {
        content.request = 'update';
        Pages.customPUT(content);
      }
      scope.editAboutContent = function editSiteContent(content) {
        About.customPUT(content);
      }

      scope.disableSiteContent = function disableSiteContent(content) {
        content.request = 'delete';
        Pages.customPUT(content);
        state.go(state.current, {}, {
          reload: true
        });
      }
      scope.enableSiteContent = function enableSiteContent(content) {
          content.request = 'enable';
          Pages.customPUT(content);
          state.go(state.current, {}, {
            reload: true
          });

        }
        // Content

      /**
       * [loadSiteContent description]
       */
      function loadSiteContent() {
        scope.content = [];
        Pages.getList().then(function(content) {
          scope.content = content;
        });
      }

      /**
       * [loadSiteContent description]
       */
      function loadAboutContent() {
        scope.about = [];
        About.customGET().then(function(content) {
          scope.about = content;
        });
      }

    }
  ]);
