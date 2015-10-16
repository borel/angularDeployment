(function () {
    'use strict';

    angular
        .module('cdvApp', [
          'ngRoute',
          'ngCookies',
          'ui.bootstrap'
          ])
        .config(config)
        .run(run);


    config.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];
    function config($routeProvider, $locationProvider,$httpProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/user', {
                controller: 'UserController',
                templateUrl: 'user/user.view.html',
                controllerAs: 'vm',
            })

            .when('/versionBI', {
                controller: 'VersionBIController',
                templateUrl: 'versionBI/versionBI.view.html',
                controllerAs: 'vm',
            })

            .when('/registerBI', {
                controller: 'RegisterBIController',
                templateUrl: 'registerBI/registerBI.view.html',
                controllerAs: 'vm',
            })

            .when('/lotBI', {
                controller: 'LotBIController',
                templateUrl: 'lotBI/lotBI.view.html',
                controllerAs: 'vm',
            })


            .otherwise({ redirectTo: '/login' });

            $httpProvider.defaults.headers.common = {};
             $httpProvider.defaults.headers.post = {};
             $httpProvider.defaults.headers.put = {};
             $httpProvider.defaults.headers.patch = {};
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http' , 'AuthenticationService'];
    function run($rootScope, $location, $cookieStore, $http , AuthenticationService , $modal , $modalInstance) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var restrictedPageAdmin = $.inArray($location.path(), ['/user']) === 0;

            // If loggedIn
            var loggedIn = $rootScope.globals.currentUser;

            // If restricted page and not loged in , send back to login
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }

            // If required admin , send back to home
            if (restrictedPageAdmin && loggedIn && !AuthenticationService.IsAdmin()) {
                $location.path('/home');
            }

        });
    }

})();
