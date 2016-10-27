'use strict';

// Vendors
require('lodash');
require('angular');

// Polyfills
require('../_helpers/polyfill-object-keys.js');

// Helpers
global.requireUtils = require('../_helpers/require-utils.js');

// App
require('./app.scss');
require('./app.module.js');

require('./components');
require('./services');

// Bootstrap Angular App
var appScope = angular.element(document.querySelectorAll('.app')).scope()
if( typeof appScope === 'undefined' || appScope === null ){
    angular.bootstrap(document, ['app'])
}
