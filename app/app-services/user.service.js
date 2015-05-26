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
        service.GetUserTypes = GetUserTypes;

        return service;

        function GetAll() {
          var getUserAction = 'action='.concat(btoa('get_users'));
          var urlGetUsers = urlAPI;
          return $http.get(urlGetUsers.concat(getUserAction)).then(handleSuccess, handleError('Error getting all users'));

        }

        function GetById(id) {
            var getUserAction = 'action='.concat(btoa('get_user'));
            var userId = '&userId='.concat(btoa(id));
            var urlGetUsers = urlAPI;
            return $http.get(urlGetUsers.concat(getUserAction).concat(userId)).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUserMail(userEmail) {
          var getUserAction = 'action='.concat(btoa('get_user'));
          var userEmail = '&email='.concat(btoa(userEmail));
          var urlGetUsers = urlAPI;
          return $http.get(urlGetUsers.concat(getUserAction).concat(userEmail)).then(handleSuccess, handleError('Error getting user by name'));
        }

        function GetUserTypes() {
          var urlUserType = urlAPI;
          urlUserType = urlUserType.concat('action='.concat(btoa('get_user_types')));
          return $http.get(urlUserType).then(handleSuccessUserTypes, handleError('Error getting user type by name'));
        }

        function Create(user,callback) {
          var urlCreateUser = urlAPI;
          urlCreateUser = urlCreateUser.concat('action='.concat(btoa('post_user_create')));
          urlCreateUser = urlCreateUser.concat('&firstName='.concat(btoa(user.firstName)));
          urlCreateUser = urlCreateUser.concat('&lastName='.concat(btoa(user.lastName)));
          urlCreateUser = urlCreateUser.concat('&typeUserId='.concat(btoa(user.typeUserId)));
          urlCreateUser = urlCreateUser.concat('&password='.concat(btoa(user.password)));
          urlCreateUser = urlCreateUser.concat('&email='.concat(btoa(user.email)));
          return $http.post(urlCreateUser)
          .success(function(wsResult){
              var response;
                if(wsResult.error != null){
                  response =  {success: false, message: wsResult.error.message };
                }else {
                  response = { success: true, message: 'User Create' };
                }

                callback(response);
          });
        }


        function Update(user,callback) {
          var urlUpdateUser = urlAPI;
          urlUpdateUser = urlUpdateUser.concat('action='.concat(btoa('post_user_update')));
          urlUpdateUser = urlUpdateUser.concat('&userId='.concat(btoa(user.userId)));
          urlUpdateUser = urlUpdateUser.concat('&firstName='.concat(btoa(user.firstName)));
          urlUpdateUser = urlUpdateUser.concat('&lastName='.concat(btoa(user.lastName)));
          urlUpdateUser = urlUpdateUser.concat('&typeUserId='.concat(btoa(user.typeUserId)));
          urlUpdateUser = urlUpdateUser.concat('&password='.concat(btoa(user.password)));
          urlUpdateUser = urlUpdateUser.concat('&email='.concat(btoa(user.email)));
          return $http.post(urlUpdateUser)
          .success(function(wsResult){
              var response;
                if(wsResult.error != null){
                  response =  {success: false, message: wsResult.error.message };
                }else {
                  response = { success: true, message: 'User Update' };
                }

                callback(response);
          });
        }

        function Delete(id,callback) {
          var urlDeleteUser = urlAPI;
          urlDeleteUser = urlDeleteUser.concat('action='.concat(btoa('post_user_delete')));
          urlDeleteUser = urlDeleteUser.concat('&userId='.concat(btoa(id)));
          return $http.post(urlDeleteUser)
          .success(function(wsResult){
              var response;
                if(wsResult.error != null){
                  response =  {success: false, message: wsResult.error.message };
                }else {
                  response = { success: true, message: 'User Delete' };
                }

                callback(response);
          });
        }

        // private functions
        function handleSuccess(wsResult) {
              if(wsResult.data.error != null){
                return { success: false, message: wsResult.data.error.message };
              }
            return wsResult.data.users;
        }

        function handleSuccessUserTypes(data) {
            return data.data.userType;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
