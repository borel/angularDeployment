(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('ModalVersionBIController', ModalVersionBIController);

        ModalVersionBIController.$inject = ['BiService', '$rootScope','$modalInstance', 'version' ,'action'];

    function ModalVersionBIController(BiService,$rootScope,$modalInstance,version,action) {

       initController(version);

       function initController(version) {
           $rootScope.version = version;

           // We adapt the message depends on the action
           if(action == 'update'){
             $rootScope.labelAction = 'Modifier';
             $rootScope.readOnlyBool = false;
           }else if(action == 'create'){
             $rootScope.labelAction = 'Créer';
             $rootScope.readOnlyBool = false;
           }else if (action == 'delete'){
             $rootScope.labelAction = 'Supprimer';
             $rootScope.readOnlyBool = true;
           }
       }

       $rootScope.ok = function () {

         $rootScope.dataLoading = true;

         if(action == 'create'){
           // create the version if he does not exists
           BiService.CreateVersionBI(version, function (response) {
             if (response.success) {
               $rootScope.dataLoading = false;
               $modalInstance.close();
             } else {
                $rootScope.error = response.message;
                $rootScope.dataLoading = false;
             }
           });

         }else if(action == 'update'){
           // update the version if he exists
           BiService.UpdateVersionBI(version, function (response) {
             if (response.success) {
               $rootScope.dataLoading = false;
               $modalInstance.close();
             } else {
                $rootScope.error = response.message;
                $rootScope.dataLoading = false;
             }
           });
         }else if(action == 'delete'){
           // update the version if he exists
           BiService.DeleteVersionBI(version.id, function (response) {
             if (response.success) {
               $rootScope.dataLoading = false;
               $modalInstance.close();
             } else {
                $rootScope.error = response.message;
                $rootScope.dataLoading = false;
             }
           });
         }
       };

       $rootScope.cancel = function () {
         $modalInstance.dismiss('cancel');
       };

    }

})();
