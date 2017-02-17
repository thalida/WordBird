'use strict';

module.exports = {
	templateUrl: 'components/wordMap/wordMap.html',
	bindings: {
		map: '<',
		changeCB: '&onChange'
	},
	controller: function (){
		var $ctrl = this;

		if( typeof $ctrl.map !== 'object' ){
			$ctrl.map = {};
		}

		$ctrl.onChange = function( actions ){
			var oldMap = angular.copy( $ctrl.map );

			if( typeof actions.remove === 'object' ){
				delete $ctrl.map[actions.remove.key];
			}

			if( typeof actions.add === 'object' ){
				$ctrl.map[actions.add.key.toLowerCase()] = {
					key: actions.add.key.toLowerCase(),
					find: actions.add.key,
					replace: actions.add.value
				};
			}

			$ctrl.changeCB({res: {newVal: $ctrl.map, oldVal: oldMap }});

			return $ctrl.map;
		};
	}
};
