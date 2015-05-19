app.controller(
  "downloadCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    function(scope, filter, timeout, state, Restangular) {
      Files = Restangular.all('Downloads?format=json');
      loadFileList();

      function loadFileList() {
        Files.getList().then(function(files) {
          scope.files = files;
        });
      }
    }
  ]
);
