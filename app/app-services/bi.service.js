(function () {
    'use strict';

    angular
        .module('cdvApp')
        .factory('BiService', BiService);

    BiService.$inject = ['$http'];
    function BiService($http) {

      var service = {};

      // Services list
      service.GetVersionBIs = GetVersionBIs;
      service.CreateVersionBI = CreateVersionBI;
      service.UpdateVersionBI = UpdateVersionBI;
      service.DeleteVersionBI = DeleteVersionBI;

      return service;

      // Service implementation
      function GetVersionBIs() {
        var urlVersionBI = urlAPI;
        urlVersionBI = urlVersionBI.concat('action='.concat(btoa('get_version_bis')));
        return $http.get(urlVersionBI).then(handleSuccess, handleError('Error getting BI version'));
      }


      function CreateVersionBI(version,callback) {
        var urlCreateVersionBI = urlAPI;
        urlCreateVersionBI = urlCreateVersionBI.concat('action='.concat(btoa('post_version_bi_create')));
        urlCreateVersionBI = urlCreateVersionBI.concat('&label='.concat(btoa(version.label)));
        return $http.post(urlCreateVersionBI)
        .success(function(wsResult){
            var response;
              if(wsResult.error != null){
                response =  {success: false, message: wsResult.error.message };
              }else {
                response = { success: true, message: 'Version BI Create' };
              }

              callback(response);
        });
      }


      function UpdateVersionBI(version,callback) {
        var urlUpdateVersionBI = urlAPI;
        urlUpdateVersionBI = urlUpdateVersionBI.concat('action='.concat(btoa('post_version_bi_update')));
        urlUpdateVersionBI = urlUpdateVersionBI.concat('&id='.concat(btoa(version.id)));
        urlUpdateVersionBI = urlUpdateVersionBI.concat('&label='.concat(btoa(version.label)));
        return $http.post(urlUpdateVersionBI)
        .success(function(wsResult){
            var response;
              if(wsResult.error != null){
                response =  {success: false, message: wsResult.error.message };
              }else {
                response = { success: true, message: 'Version BI update' };
              }

              callback(response);
        });
      }

      function DeleteVersionBI(version,callback) {
        var urlDeleteVersionBI = urlAPI;
        urlDeleteVersionBI = urlDeleteVersionBI.concat('action='.concat(btoa('post_version_bi_delete')));
        urlDeleteVersionBI = urlDeleteVersionBI.concat('&id='.concat(btoa(version.id)));
        return $http.post(urlDeleteVersionBI)
        .success(function(wsResult){
            var response;
              if(wsResult.error != null){
                response =  {success: false, message: wsResult.error.message };
              }else {
                response = { success: true, message: 'Version BI delete' };
              }

              callback(response);
        });
      }

      // private functions
      function handleSuccess(data) {
          return data.data.versionBI;
      }

      function handleError(error) {
          return function () {
              return { success: false, message: error };
          };
      }
  }

})();
