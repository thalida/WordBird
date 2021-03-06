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

require('./services');
require('./components');
require('./views');
