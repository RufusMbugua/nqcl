app.controller(
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
