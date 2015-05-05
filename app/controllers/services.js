app.controller(
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
