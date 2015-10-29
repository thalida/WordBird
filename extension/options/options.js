window.app = angular.module('app', []);

app.controller('mainCtrl', [
	'$scope',
	'StorageCollection',
	function( $scope, StorageCollection ){
		var isProcessing = false;
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

		$scope.onUpdate = function( res ){
			if( isProcessing === true ){
				return;
			}

			isProcessing = true;

			storage.set('wordMap', res.newMap).then(function(){
				isProcessing = false;
			});
		};
	}
]);
