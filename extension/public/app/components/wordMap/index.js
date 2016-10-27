'use strict';

require('./wordMap.scss');
require('./wordMap.html');

angular
    .module('app')
    .component('wordMap', require('./wordMap.component.js'));
