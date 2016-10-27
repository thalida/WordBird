'use strict';

module.exports = {
	templateUrl: 'components/blacklist/blacklist.html',
	bindings: {
		list: '=',
		changeCB: '&onChange'
	},
	controller: function (){
		var $ctrl = this;
		var ENTER_KEY = 13;

		if( Array.isArray($ctrl.list) === false ){
			$ctrl.list = [];
		}

		$ctrl.newUrl = {};

		$ctrl.onKeyup = function( e ){
			$ctrl.validate({save: e.keyCode === ENTER_KEY});
		};

		$ctrl.validate = function( opts ){
			$ctrl.newUrl.isValid = $ctrl.form.url.$valid === true;

			if( $ctrl.newUrl.isValid === false || $ctrl.form.$valid === false ){
				return;
			}

			if( opts.save === true ){
				$ctrl.update({type: 'add', data: $ctrl.newUrl.val});
				$ctrl.newUrl.val = '';
			}
		};

		$ctrl.update = function( action ){
			var oldList = angular.copy( $ctrl.list );

			if( action.type === 'remove' ){
				$ctrl.list.splice( action.data, 1 );
			} else if( action.type === 'add' ){
				$ctrl.list.push( action.data );
			}

			$ctrl.changeCB({res: {newVal: $ctrl.list, oldVal: oldList }});

			return $ctrl.list;
		};
	}
};
