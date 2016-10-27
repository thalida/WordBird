'use strict';
require('./wordMapRow.scss');
require('./wordMapRow.html');

angular
    .module('app')
    .component('wordMapRow', require('./wordMapRow.component.js'));
