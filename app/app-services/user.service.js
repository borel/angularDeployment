(function () {
    'use strict';

    angular
        .module('cdvApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUserMail = GetByUserMail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
          var getUserAction = 'action='.concat(btoa('get_users'));
          var urlGetUsers = urlAPI;
          return $http.get(urlGetUsers.concat(getUserAction)).then(handleSuccess, handleError('Error getting all users'));

        }

        function GetById(id) {
            var getUserAction = 'action='.concat(btoa('get_user'));
            var userId = '&id='.concat(btoa(id));
            var urlGetUsers = urlAPI;
            return $http.get(urlGetUsers.concat(getUserAction).concat(userId)).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUserMail(userEmail) {
          var getUserAction = 'action='.concat(btoa('get_user'));
          var userEmail = '&email='.concat(btoa(userEmail));
          var urlGetUsers = urlAPI;
          return $http.get(urlGetUsers.concat(getUserAction).concat(userEmail)).then(handleSuccess, handleError('Error getting user by name'));
        }

        function Create(user) {
          //todo
            return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
        }

        function Update(user) {
          //todo
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
          //todo
            return $http.delete('/api/users/' + user.id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

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
