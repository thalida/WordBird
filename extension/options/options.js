window.app = angular.module('app', []);

app.controller('mainCtrl', [
	'$scope',
	'StorageCollection',
	function( $scope, StorageCollection ){
		var storage = new StorageCollection();
		var defaultWordMap = {
			'word': 'bird',
			'bird': 'flippity flappity'
		};

		storage.add({
			key: 'wordMap',
			defaultTo: defaultWordMap,
			onChange: function( newWordMap ){
				$scope.wordMap = newWordMap;
			}
		});

		$scope.onChange = function( res ){
			console.log( res );
		};
	}
]);
