(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('ModalUserController', ModalUserController);

        ModalUserController.$inject = ['UserService', '$rootScope','$modalInstance', 'user'];

    function ModalUserController(UserService,$rootScope,$modalInstance, user ) {
       $rootScope.user = user;


       $rootScope.ok = function () {
         $modalInstance.close();
       };

       $rootScope.cancel = function () {
         $modalInstance.dismiss('cancel');
       };

    }

})();
