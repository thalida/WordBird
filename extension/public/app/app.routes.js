'use strict';

module.exports = function( $urlRouterProvider, $locationProvider ){
    "ngInject";

    $locationProvider.html5Mode( false );
    $urlRouterProvider.otherwise('/');
}
