app.controller(
  "usersCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    'md5', 'localStorageService',

    function(scope, filter, timeout, state, Restangular, md5,
      localStorageService) {
      var users = Restangular.all('users');


      scope.login = function login() {
        scope.user.password = md5.createHash(scope.user.password || '');
        users.post(scope.user).then(function(response) {
          console.log(response);
          localStorageService.set('user', response);
        });
      }

    }
  ]
);
