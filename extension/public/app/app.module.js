'use strict';

angular
	.module( 'app', [
	    require('angular-animate'),
	    require('angular-resource'),
	    require('angular-sanitize'),
	    require('angular-touch'),
	    require('angular-ui-router'),
	    require('angular-messages')
	])
	.config( require('./app.routes.js') );
