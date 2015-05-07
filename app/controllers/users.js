app.controller(
  "usersCtrl", ['$scope', '$filter', '$timeout', '$state', 'Restangular',
    'md5',

    function(scope, filter, timeout, state, Restangular, md5) {
      var users = Restangular.all('users');


      scope.login = function login() {
        scope.user.password = md5.createHash(scope.user.password || '');
        users.post(scope.user).then(function(response) {
          if (response[0]) {
            state.
          }
        });
      }

    }
  ]
);
