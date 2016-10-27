'use strict';

require('./footer.scss');
require('./footer.html');

angular
    .module('app')
    .component('footer', require('./footer.component.js'));
