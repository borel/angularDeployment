(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('ModalLotBIController', ModalLotBIController);

        ModalLotBIController.$inject = ['BiService', '$rootScope','$modal','lotBI'];
    function ModalLotBIController(BiService,$rootScope,$modal,lotBI) {
      $rootScope.bis = [];
      initController();

      function initController() {
        $rootScope.lotBI = lotBI;
        loadBIs();
      }

      function loadBIs() {
        BiService.GetBIs(lotBI)
          .then(function (bis) {
            $rootScope.bis = bis;
        });
      }

    }

})();
