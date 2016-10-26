/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/popup/bundle/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	window.app = angular.module('app', []);

	app.controller('mainCtrl', [
		'$scope',
		'StorageCollection',
		function( $scope, StorageCollection ){
			var isProcessing = false;
			var storage = new StorageCollection();

			storage.add({
				key: 'wordMap',
				defaultTo: {
					'word': 'bird',
					'cloud': 'butt',
					'google': 'Our Benevolent Lord and Master'
				},
				onChange: function( wordMap ){
					$scope.wordMap = wordMap;
				}
			});

			storage.add({
				key: 'blacklist',
				defaultTo: ['inbox.google.com', 'mail.google.com', 'calendar.google.com'],
				onChange: function( blacklist ){
					$scope.blacklist = blacklist;
				}
			});

			$scope.onMapUpdate = function( map ){
				storage.set('wordMap', map.newVal);
			};

			$scope.onBlacklistUpdate = function( list ){
				console.log( list );
				storage.set('blacklist', list.newVal);
			};
		}
	]);


/***/ }
/******/ ]);