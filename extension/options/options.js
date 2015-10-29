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
				'bird': 'flippity flappity'
			},
			onChange: function( wordMap ){
				$scope.wordMap = wordMap;
			}
		});

		storage.add({
			key: 'blacklist',
			defaultTo: [],
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
