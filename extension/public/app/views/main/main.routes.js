'use strict';

module.exports = function( $stateProvider, $urlRouterProvider ){
    "ngInject";

    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'views/main/main.html',
        controller: 'MainController',
        controllerAs: '$ctrl'
    });

    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();

        // check to see if the path already has a slash where it should be
        if ('/' === path[path.length - 1] || path.indexOf('/?') > -1) {
            return;
        }

        if (path.indexOf('?') > -1) {
            return path.replace('?', '/?');
        }

        return path + '/';
    });
};
