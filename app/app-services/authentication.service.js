(function () {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {
            var urlAuthentication = urlAPI;
            urlAuthentication = urlAuthentication.concat('action='.concat(btoa('cdv_authentication')));
            urlAuthentication = urlAuthentication.concat('&name='.concat(btoa(username)));
            urlAuthentication = urlAuthentication.concat( '&password='.concat(btoa(password)));

            return $http.get(urlAuthentication)
                .success(function(data){
                var response;
                  if(data.users.length == 1){
                    response = { success: true };
                  }else {
                    response = { success: false, message: 'Username or password is incorrect' };
                  }

                  callback(response);
              });
          }


        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

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
    }


})();
