(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('RegisterBIController', RegisterBIController);

    RegisterBIController.$inject = ['BiService', '$rootScope','$cookieStore'];
    function RegisterBIController(BiService,$rootScope,$cookieStore) {
      var vm = this;

      vm.currentUser = $cookieStore.get('user');
      vm.versionBIs = [];
      vm.generate = generate;
      // todo : to import via scan
      vm.roulotBiId = '1';


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


      function generate() {
        vm.dataLoading = true;
        BiService.GenerateLotBi(vm.versionBI.id,vm.nbBI,vm.roulotBiId,vm.currentUser.userId,vm.sizeBi,function (response) {
          if (response.success) {
             vm.dataLoading = false;
             vm.success = response.message;
          } else {
            vm.dataLoading = false;
             vm.error = response.message;
          }
        });

      }


    }

})();
