'use strict';

require('./toggle.scss');
require('./toggle.html');

angular
    .module('app')
    .component('toggle', require('./toggle.component.js'));
