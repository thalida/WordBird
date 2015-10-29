'use strict';

app.directive('wordMapRow',[function(){
	return {
		require: '^wordMap',
		restric: 'E',
		replace: false,
		scope: {
			word: '=?word',
			replacer: '=?replacer'
		},
		template: [
			'<form no-validate class="mapping-item">',
				'<input type="text" ng-model="word" ng-keyup="onKeyup($event)" placeholder="Type a word" ng-required />',
				'->',
				'<input type="text" ng-model="replacer" ng-keyup="onKeyup($event)" placeholder="Replace with..." />',
				'remove',
				'<span ng-show="hasError">{{error}}</span>',
			'</form>'
		].join(''),
		link: function($scope, $el, attrs){
			var ENTER_KEY = 13;

			var validate = function(){

			};

			$scope.onKeyup = function( e ){
				if( e.keyCode === ENTER_KEY ){
					validate();
				}
			};
		}
	};
}]);
