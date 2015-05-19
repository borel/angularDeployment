'use strict';

angular.module('cdvApp')
    .directive('ngHeader', function (AuthenticationService) {
        return {
            templateUrl: 'app-directives/header/header.html',
            restrict: 'E',
            link: function (scope, elem, attrs) {
              scope.isAdmin = AuthenticationService.IsAdmin();
            }
        };
    });
