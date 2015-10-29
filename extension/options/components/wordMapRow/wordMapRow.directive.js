'use strict';

app.directive('wordMapRow',[function(){
	return {
		require: '^wordMap',
		restrict: 'E',
		templateUrl: 'components/wordMapRow/wordMapRow.html',
		scope: {},
		bindToController: {
			origWord: '@?word',
			origReplacer: '@?replacer',
			updateMap: '&onChange'
		},
    	controllerAs: 'maprow',
		controller: ['$element', '$attrs', function( $el, attrs ){
			var ENTER_KEY = 13;

			this.isCreatorRow = ( typeof attrs.creator !== 'undefined' );

			this.word = { val: this.origWord };
			this.replacer = { val: this.origReplacer };

			this.validate = function( e, inputName ){
				this[inputName].isValid = this.form[inputName].$valid === true;

				if( this[inputName].isValid === false || this.form.$valid === false ){
					return;
				}

				this.save( inputName );
			};

			this.save = function( inputName ){
				var actions = { add: { key: this.word.val, value: this.replacer.val } };

				if( inputName === 'word' ){
					actions.remove = {key: this.origWord};
				}

				this.updateMap({actions: actions});

				if( this.isCreatorRow ){
					this.word.val = '';
					this.replacer.val = '';
					$el.children('.js-word-input')[0].focus();
				}
			};

			this.remove = function(){
				this.updateMap({ actions: {remove: {key: this.origWord}} });
			};

			this.onEvent = function( e ){
				if( e.type === 'blur' || e.keyCode === ENTER_KEY ){
					// $el.children('.js-word-input')[0].focus();
					// console.log( $el.children('.js-word-input')[0] );
					this.validate( e, e.target.name );
				}
			};
		}]
	};
}]);
