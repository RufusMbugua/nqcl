app.factory('Session', ['localStorageService', '$rootScope', function(
  localStorageService, rootScope) {

  return {
    checkIfLogged: function checkIfLogged() {
      rootScope.user = [];
      user = localStorageService.get('user');
      if (user == null) {
        rootScope.user = null;
        status = 'Not Logged In';
      } else {
        rootScope.user = user;
        status = 'Logged In';
      }

    }
  }

}]);
