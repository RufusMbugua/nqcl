app.controller(
  "homeCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    function(scope, filter, timeout, state, Restangular) {
      var front = Restangular.all('content/content?format=json');
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
          console.log(content);
          angular.forEach(content, function(value, key) {
            switch (value.name) {
              case "Welcome to NQCL":
                scope.content.welcome = value;
                break;
              case "Our Services":
                scope.content.services = value;
                break;
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
