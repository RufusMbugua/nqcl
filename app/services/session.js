app.factory('Session', ['localStorageService', '$rootScope', '$state', function(
  localStorageService, rootScope, state) {
  var Session = {};

  Session.checkIfLogged = function checkIfLogged() {
    rootScope.user = [];
    user = localStorageService.get('user');
    if (user == null) {
      rootScope.user = null;
      rootScope.level = 'public'
      status = 'false';
    } else {
      rootScope.user = user;
      rootScope.level = 'admin'
      status = 'true';
    }
    return status;

  }

  Session.update = function update(user) {
    rootScope.user = user;
  }

  Session.identify = function identify() {
    var currentState = state.current;

    if (currentState.name == 'logout') {
      destroy();
      state.go('public.home');
    }
    return 'Done';
  }

  function destroy() {
    rootScope.user = null;
    localStorageService.remove('user');
  }
  return Session;

}]);