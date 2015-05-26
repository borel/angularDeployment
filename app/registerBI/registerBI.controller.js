(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('RegisterBIController', RegisterBIController);

    RegisterBIController.$inject = ['BiService', '$rootScope','$modal'];
    function RegisterBIController(BiService,$rootScope,$modal) {
      var vm = this;
      vm.versionBIs = [];

      initController();

      function initController() {
          $rootScope.error = null;
          loadAllVersionBIs();
      }


      function loadAllVersionBIs() {
            BiService.GetVersionBIs()
              .then(function (biVersions) {
                  vm.versionBIs = biVersions;
              });
      }
    }

})();
