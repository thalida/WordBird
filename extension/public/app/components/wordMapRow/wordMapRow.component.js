'use strict';

module.exports = {
	require: '^wordMap',
	templateUrl: 'components/wordMapRow/wordMapRow.html',
	bindings: {
		origWord: '@?word',
		origReplacer: '@?replacer',
		updateMap: '&onChange'
	},
	controller: ['$element', '$attrs', function( $el, attrs ){
		var $ctrl = this;
		var ENTER_KEY = 13;
		var $wordInput;

		$ctrl.isCreatorRow = ( typeof attrs.creator !== 'undefined' );

		$ctrl.word = { val: $ctrl.origWord };
		$ctrl.replacer = { val: $ctrl.origReplacer };

		$ctrl.validate = function( e, inputName ){
			$ctrl[inputName].isValid = $ctrl.form[inputName].$valid === true;

			if( typeof $ctrl[inputName].val === 'string' && $ctrl[inputName].val.length === 0 ){
				$ctrl[inputName].isValid = false;
			}

			if( $ctrl[inputName].isValid === false || $ctrl.form.$valid === false ){
				return;
			}

			$ctrl.save( inputName );
		};

		$ctrl.save = function( inputName ){
			var actions = { add: { key: $ctrl.word.val, value: $ctrl.replacer.val } };

			if( inputName === 'word' ){
				actions.remove = {key: $ctrl.origWord};
			}

			$ctrl.updateMap({actions: actions});

			if( $ctrl.isCreatorRow ){
				$ctrl.word.val = '';
				$ctrl.replacer.val = '';
				$wordInput.focus();
				$ctrl.form.$setPristine();
			}
		};

		$ctrl.remove = function(){
			$ctrl.updateMap({ actions: {remove: {key: $ctrl.origWord}} });
		};

		$ctrl.onEvent = function( e ){
			if( e.type === 'blur' || e.keyCode === ENTER_KEY ){
				if( e.target.name === 'word' ){
					$wordInput = e.target;
				}
				$ctrl.validate( e, e.target.name );
			}
		};
	}]
};
