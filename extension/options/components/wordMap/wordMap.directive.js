'use strict';

app.directive('wordMap',[function(){
	return {
		restric: 'E',
		scope: {
			map: '='
		},
		template: [
			'<div class="mapping">',
				'<div ng-repeat="(word, replacer) in map">',
					'<word-map:row word="word" replacer="replacer"></word-map:row>',
				'</div>',
			'</div>'
		].join(''),
		controller: ['$scope','$element','$attrs', function ($scope, $element, $attrs){
			if( typeof $scope.map !== 'object' ){
				$scope.map = {};
			}

			this.onChange = function( newPair ){
				$scope.map[newPair.key] = newPair.value;
			};
		}],
		link: function($scope, $el, attrs){

		}
	};
}]);
