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
      service.GenerateLotBi = GenerateLotBi;
      service.GetLotBIs = GetLotBIs;
      service.GetBIs = GetBIs;
      service.GetVersionBI = GetVersionBI;

      return service;

      // Service implementation
      function GetVersionBIs() {
        var urlVersionBI = urlAPI;
        urlVersionBI = urlVersionBI.concat('action='.concat(btoa('get_version_bis')));
        return $http.get(urlVersionBI).then(handleVersionBiSuccess, handleError('Error getting BI version'));
      }

      function GetVersionBI(id) {
        var urlVersionBI = urlAPI;
        urlVersionBI = urlVersionBI.concat('action='.concat(btoa('get_version_bi')));
        urlVersionBI = urlVersionBI.concat('&id='.concat(btoa(id)));
        return $http.get(urlVersionBI).then(handleVersionBiSuccess, handleError('Error getting BI version'));
      }

      // private functions
      function handleVersionBiSuccess(data) {
          return data.data.versionBI;
      }


      function CreateVersionBI(version,callback) {
        var urlCreateVersionBI = urlAPI;
        urlCreateVersionBI = urlCreateVersionBI.concat('action='.concat(btoa('post_version_bi_create')));
        urlCreateVersionBI = urlCreateVersionBI.concat('&label='.concat(btoa(version.label)));
        urlCreateVersionBI = urlCreateVersionBI.concat('&conductorWire='.concat(btoa(version.conductorWire)));
        urlCreateVersionBI = urlCreateVersionBI.concat('&paramDenudage='.concat(btoa(version.paramDenudage)));
        urlCreateVersionBI = urlCreateVersionBI.concat('&paramDetourage='.concat(btoa(version.paramDetourage)));
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
        urlUpdateVersionBI = urlUpdateVersionBI.concat('&conductorWire='.concat(btoa(version.conductorWire)));
        urlUpdateVersionBI = urlUpdateVersionBI.concat('&paramDenudage='.concat(btoa(version.paramDenudage)));
        urlUpdateVersionBI = urlUpdateVersionBI.concat('&paramDetourage='.concat(btoa(version.paramDetourage)));
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


      function GenerateLotBi(versionBiId,nbBI,roulotBiId,userId,sizeBi,callback){
        var urlGenerateLotBi = urlAPI;
        urlGenerateLotBi = urlGenerateLotBi.concat('action='.concat(btoa('post_generate_lot_bi')));
        urlGenerateLotBi = urlGenerateLotBi.concat('&versionBiId='.concat(btoa(versionBiId)));
        urlGenerateLotBi = urlGenerateLotBi.concat('&nbBi='.concat(btoa(nbBI)));
        urlGenerateLotBi = urlGenerateLotBi.concat('&clothRollId='.concat(btoa(roulotBiId)));
        urlGenerateLotBi = urlGenerateLotBi.concat('&sizeBi='.concat(btoa(sizeBi)));
        urlGenerateLotBi = urlGenerateLotBi.concat('&userId='.concat(btoa(userId)));

        return $http.post(urlGenerateLotBi)
        .success(function(wsResult){
            var response;
              if(wsResult.error != null){
                response =  {success: false, message: wsResult.error.message };
              }else {
                var messageSuccess =  'Le lot a été généré : ';
                messageSuccess = messageSuccess.concat(wsResult.lotBi);
                response = { success: true, message: messageSuccess};
              }

              callback(response);
        });
      }

      function GetLotBIs() {
        var urlVersionBI = urlAPI;
        urlVersionBI = urlVersionBI.concat('action='.concat(btoa('get_lot_bis')));
        return $http.get(urlVersionBI).then(handleLotBiSuccess, handleError('Error getting BI version'));
      }

      // private functions
      function handleLotBiSuccess(data) {
          return data.data.lotBis;
      }


      function GetBIs(lotBI) {
        var urlVersionBI = urlAPI;
        urlVersionBI = urlVersionBI.concat('action='.concat(btoa('get_bis')));
        urlVersionBI = urlVersionBI.concat('&lotId='.concat(btoa(lotBI.id)));
        return $http.get(urlVersionBI).then(handleBiSuccess, handleError('Error getting BI version'));
      }

      // private functions
      function handleBiSuccess(data) {
          return data.data.bis;
      }

      function handleError(error) {
          return function () {
              return { success: false, message: error };
          };
      }
  }

})();
