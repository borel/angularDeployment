'use strict';

angular.module('cdvApp')
    .directive('ngFooter', function () {
        return {
            templateUrl: 'app-directives/footer/footer.html',
            restrict: 'E',
            link: function () {

            }
        };
    });
