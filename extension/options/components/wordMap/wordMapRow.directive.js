'use strict';

app.directive('wbWordMapRow',[function(){
	return {
		require: '^wbWordMap',
		restric: 'E',
		replace: false,
		scope: {
			word: '=?word',
			replacer: '=?replacer'
		},
		template: [
			'<div class="mapping-item">',
				'<input type="text" ng-model="word" placeholder="Type a word" />',
				'->',
				'<input type="text" ng-model="replacer" placeholder="Replace with..." />',
				'remove',
			'</div>'
		].join(''),
		link: function($scope, $el, attrs){

		}
	};
}]);
