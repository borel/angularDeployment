(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('UserController', UserController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function UserController(UserService, $location, $rootScope, FlashService) {
        var vm = this;
        vm.register = register;


    }

})();
