(function () {
    'use strict';

    angular
        .module('cdvApp')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope','UserService'];
    function AuthenticationService($http, $cookieStore, $rootScope,UserService) {
        var service = {};
        var currentUser = $cookieStore.get('user');

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;
        service.IsAdmin = IsAdmin;

        return service;

        function Login(email, password, callback) {
            var urlAuthentication = urlAPI;
            urlAuthentication = urlAuthentication.concat('action='.concat(btoa('authentication')));
            urlAuthentication = urlAuthentication.concat('&email='.concat(btoa(email)));
            urlAuthentication = urlAuthentication.concat( '&password='.concat(btoa(password)));

            return $http.get(urlAuthentication)
                .success(function(data){
                var response;
                  if(data.users.length == 1){
                    $cookieStore.put('user', data.users[0]);
                    response = { success: true };
                  }else {
                    response = { success: false, message: 'Email or password is incorrect' };
                  }

                  callback(response);
              });
          }


        function SetCredentials(username, password) {
            var authdata = btoa(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }

        function IsAdmin() {
          if (_.isEmpty(currentUser)) {
                return false;
            }

          // the admin value is 0
          if(currentUser.typeUserId == 1){
            return true;
          }

            return false;
        }
    }


})();
