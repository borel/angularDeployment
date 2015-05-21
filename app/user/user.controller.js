(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('UserController', UserController);

    UserController.$inject = ['UserService', '$rootScope','$modal'];
    function UserController(UserService,$rootScope,$modal) {
        var vm = this;
        vm.allUsers = [];
        // Init the screen
        initController();

        function initController() {
            loadAllUsers();
            loadUserType();
            $rootScope.selected = {
              user: vm.allUsers[0]
            };
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function loadUserType() {
            UserService.GetUserTypes()
                .then(function (userTypes) {
                    $rootScope.userTypes = userTypes;
                });
        }

       $rootScope.animationsEnabled = true;


       $rootScope.open = function () {
         var modalInstance = $modal.open({
            animation: $rootScope.animationsEnabled,
            templateUrl: 'user/modal/modal.user.view.html',
            controller : 'ModalUserController',

             resolve: {
               user: function () {
                 return $rootScope.selected.user;
               }

             }
           });

           modalInstance.result.then(function () {
              alert("ok");
           }, function () {
              alert("cancel");
           });
       };

       $rootScope.toggleAnimation = function () {
         $rootScope.animationsEnabled = !$rootScope.animationsEnabled;
       };
    }





})();
