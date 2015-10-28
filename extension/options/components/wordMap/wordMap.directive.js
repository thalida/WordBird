'use strict';

app.directive('wbWordMap',[function(){
	return {
		restric: 'E',
		scope: {
			map: '='
		},
		template: [
			'<div class="mapping">',
				'<div ng-repeat="(word, replacer) in map">',
					'<wb:word-map-row word="word" replacer="replacer"></wb:word-map-row>',
				'</div>',
			'</div>'
		].join(''),
		controller: ['$scope','$element','$attrs', function ($scope, $element, $attrs){
		}],
		link: function($scope, $el, attrs){

		}
	};
}]);
