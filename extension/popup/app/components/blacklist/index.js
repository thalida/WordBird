'use strict';

require('./blacklist.html');

angular
    .module('app')
    .component('blacklist', require('./blacklist.component.js'));
