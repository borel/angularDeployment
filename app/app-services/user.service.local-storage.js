(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q' , '$http'];
    function UserService($timeout, $filter, $q , $http) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
          var getUserAction = 'action='.concat(btoa('get_users_cdv'));
          var urlGetUsers = urlAPI;
          return $http.get(urlGetUsers.concat(getUserAction)).then(handleSuccess, handleError('Error getting all users'));

        }

        function GetById(id) {
            var getUserAction = 'action='.concat(btoa('get_user_cdv'));
            var userId = '&id='.concat(btoa(id));
            var urlGetUsers = urlAPI;
            return $http.get(urlGetUsers.concat(getUserAction).concat(userId)).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
          var getUserAction = 'action='.concat(btoa('get_user_cdv'));
          var userName = '&name='.concat(btoa(username));
          var urlGetUsers = urlAPI;
          return $http.get(urlGetUsers.concat(getUserAction).concat(userName)).then(handleSuccess, handleError('Error getting user by name'));
        }

        function Create(user) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var users = getUsers();

                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        function Update(user) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            var users = getUsers();
            for (var i = 0; i < users.length; i++) {
                var user = users[i];
                if (user.id === id) {
                    users.splice(i, 1);
                    break;
                }
            }
            setUsers(users);
            deferred.resolve();

            return deferred.promise;
        }

        // private functions

        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }

        function handleSuccess(data) {
           return data.data.users;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

    }
})();
