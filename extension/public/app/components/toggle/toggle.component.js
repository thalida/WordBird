'use strict';

module.exports = {
	templateUrl: 'components/toggle/toggle.html',
	bindings: {
		label: '@',
		state: '<',
		changeCB: '&onChange'
	},
	controller: function (){
		var $ctrl = this;

		if( typeof $ctrl.state === 'undefined' ){
			$ctrl.state = true;
		}

		$ctrl.onChange = function(){
			console.log( $ctrl.state );
			$ctrl.changeCB({res: {newVal: $ctrl.state, oldVal: !$ctrl.state }});
		};
	}
};
