'use strict';

require('./blacklist.scss');
require('./blacklist.html');

angular
    .module('app')
    .component('blacklist', require('./blacklist.component.js'));
