(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('VersionBIController', VersionBIController);

    VersionBIController.$inject = ['BiService', '$rootScope','$modal'];
    function VersionBIController(BiService,$rootScope,$modal) {
      var vm = this;
      vm.allBiVersions = [];

      initController();

      function initController() {
          loadAllVersionBIs();
          $rootScope.selected = {
            version: vm.allBiVersions[0]
          };
      }

      function loadAllVersionBIs() {
            BiService.GetVersionBIs()
              .then(function (biVersions) {
                  vm.allBiVersions = biVersions;
              });
      }



      $rootScope.createVersionBI = function () {
        var modalInstance = $modal.open({
           animation: $rootScope.animationsEnabled,
           templateUrl: 'versionBI/modal/modal.versionBI.view.html',
           controller : 'ModalVersionBIController',
            resolve: {
              version: function () {
                  // create an empty object of user
                  var version = {};
                  return version;
              },
              action: function () {
                  return "create";
              }
            }
          });

          modalInstance.result.then(function () {
            loadAllVersionBIs();
          }, function () {
            loadAllVersionBIs();
            $rootScope.error = null;
          });
      };

      $rootScope.updateVersionBI = function () {
        var modalInstance = $modal.open({
           animation: $rootScope.animationsEnabled,
           templateUrl: 'versionBI/modal/modal.versionBI.view.html',
           controller : 'ModalVersionBIController',
            resolve: {
              version: function () {
                  return $rootScope.selected.version;
              },

              action: function () {
                  return "update";
              }
            }
          });

          modalInstance.result.then(function () {
            loadAllVersionBIs();
          }, function () {
            loadAllVersionBIs();
            $rootScope.error = null;
          });
      };


      $rootScope.deleteVersionBI = function () {
        var modalInstance = $modal.open({
           animation: $rootScope.animationsEnabled,
           templateUrl: 'versionBI/modal/modal.versionBI.view.html',
           controller : 'ModalVersionBIController',
            resolve: {
              version: function () {
                  return $rootScope.selected.version;
              },

              action: function () {
                  return "delete";
              }
            }
          });

          modalInstance.result.then(function () {
            loadAllVersionBIs();
          }, function () {
            loadAllVersionBIs();
            $rootScope.error = null;
          });
      };

    }

})();
