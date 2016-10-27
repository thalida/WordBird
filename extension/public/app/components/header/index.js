'use strict';

require('./header.scss');
require('./header.html');

angular
    .module('app')
    .component('header', require('./header.component.js'));
