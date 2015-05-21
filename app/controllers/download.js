app.controller(
  "downloadCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    function(scope, filter, timeout, state, Restangular) {
      Files = Restangular.all('Downloads?format=json');
      loadFileList();

      function loadFileList() {
        Files.customGET().then(function(files) {
          console.log(files);
          scope.files = files;
        });
      }
    }
  ]
);
