'use strict';

app.directive('wordMap',[function(){
	return {
		restric: 'E',
		templateUrl: 'components/wordMap/wordMap.html',
		scope: {},
		bindToController: {
			map: '=',
			changeCB: '&onChange'
		},
		controllerAs: 'wordmap',
		controller: function (){
			if( typeof this.map !== 'object' ){
				this.map = {};
			}

			this.onChange = function( actions ){
				var oldMap = angular.copy( this.map );

				if( typeof actions.remove === 'object' ){
					delete this.map[actions.remove.key];
				}

				if( typeof actions.add === 'object' ){
					this.map[actions.add.key] = actions.add.value;
				}

				this.changeCB({res: {newVal: this.map, oldVal: oldMap }});

				return this.map;
			};
		}
	};
}]);
