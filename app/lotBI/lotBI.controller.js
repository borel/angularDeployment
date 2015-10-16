(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('LotBIController', LotBIController);

        LotBIController.$inject = ['BiService', '$rootScope','$modal'];
    function LotBIController(BiService,$rootScope,$modal) {
        var vm = this;
        vm.lotBIs = [];

        initController();

        function initController() {
          loadLotBIs();
          vm.selected = {
            lotBI: vm.lotBIs[0]
          };
        }

        function loadLotBIs() {
          BiService.GetLotBIs()
            .then(function (lotBIs) {
                vm.lotBIs = lotBIs;
            });
        }

        function getVersionBI(id){
          BiService.GetVersionBI(id)
            .then(function (versionBI) {
                vm.versionBI = versionBI;
            });
        }

        $rootScope.loadVersion = function () {
          var modalInstance = $modal.open({
             animation: $rootScope.animationsEnabled,
             templateUrl: 'versionBI/modal/modal.versionBI.view.html',
             controller : 'ModalVersionBIController',
              resolve: {
                version: function () {
                    //load the version
                    getVersionBI(vm.selected.versionBiId);
                    return  vm.versionBI;
                },

                action: function () {
                    return "update";
                }
              }
            });

            modalInstance.result.then(function () {
              loadLotBIs();
            }, function () {
              loadLotBIs();
              $rootScope.error = null;
            });
        };

        $rootScope.loadLotBI = function () {
          var modalInstance = $modal.open({
             templateUrl: 'lotBI/modal/modal.lotBI.view.html',
             controller : 'ModalLotBIController',
              resolve: {
                lotBI: function () {
                    return vm.selected;
                }
              }
            });

            modalInstance.result.then(function () {
              loadLotBIs();
            }, function () {
              loadLotBIs();
            });
        };
      }
    }

)();
