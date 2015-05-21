(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('ModalUserController', ModalUserController);

        ModalUserController.$inject = ['UserService', '$rootScope','$modalInstance', 'user'];

    function ModalUserController(UserService,$rootScope,$modalInstance, user ) {
       $rootScope.user = user;
       var indexUserType = _.findIndex($rootScope.userTypes, { id: user.typeUserId});

       // We must find the rignt user type for the user
       $rootScope.user_types = $rootScope.userTypes[indexUserType];

       $rootScope.ok = function () {
         $modalInstance.close();
       };

       $rootScope.cancel = function () {
         $modalInstance.dismiss('cancel');
       };

    }

})();
