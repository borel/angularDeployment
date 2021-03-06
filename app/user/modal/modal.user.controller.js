(function () {
    'use strict';

    angular
        .module('cdvApp')
        .controller('ModalUserController', ModalUserController);

        ModalUserController.$inject = ['UserService', '$rootScope','$modalInstance', 'user' ,'action'];

    function ModalUserController(UserService,$rootScope,$modalInstance, user,action) {

       initController(user);

       function initController(user) {
           $rootScope.user = user;

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

           // We must find the rignt user type for the user
           var indexUserType;
           if(user == null){
             indexUserType = '0';
           }else{
             indexUserType = _.findIndex($rootScope.userTypes, { id: user.typeUserId});
           }
           $rootScope.selected.userType = $rootScope.userTypes[indexUserType];
       }


       $rootScope.ok = function () {
         // Update userType for the user
         user.typeUserId = $rootScope.selected.userType.id;
         $rootScope.dataLoading = true;

         if(action == 'create'){
           // create the user if he does not exists
           UserService.Create(user, function (response) {
             if (response.success) {
               $rootScope.dataLoading = false;
               $modalInstance.close();
             } else {
                $rootScope.error = response.message;
                $rootScope.dataLoading = false;
             }
           });

         }else if(action == 'update'){
           // update the user if he exists
           UserService.Update(user, function (response) {
             if (response.success) {
               $rootScope.dataLoading = false;
               $modalInstance.close();
             } else {
                $rootScope.error = response.message;
                $rootScope.dataLoading = false;
             }
           });
         }else if(action == 'delete'){
           // update the user if he exists
           UserService.Delete(user.userId, function (response) {
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
