app.factory('Session', ['localStorageService', '$rootScope', function(
  localStorageService, rootScope) {
  var Session = {};

  Session.checkIfLogged = function checkIfLogged() {
    rootScope.user = [];
    user = localStorageService.get('user');
    if (user == null) {
      rootScope.user = null;
      status = 'false';
    } else {
      rootScope.user = user;
      status = 'true';
    }
    return status;

  }
  return Session;

}]);
