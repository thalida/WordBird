'use strict';

app.directive('blacklist',[function(){
	return {
		restric: 'E',
		templateUrl: 'components/blacklist/blacklist.html',
		scope: {},
		bindToController: {
			list: '=',
			changeCB: '&onChange'
		},
		controllerAs: 'blacklist',
		controller: function (){
			var ENTER_KEY = 13;

			if( Array.isArray(this.list) === false ){
				this.list = [];
			}

			this.newUrl = {};

			this.onKeyup = function( e ){
				this.validate({save: e.keyCode === ENTER_KEY});
			};

			this.validate = function( opts ){
				this.newUrl.isValid = this.form.url.$valid === true;

				if( this.newUrl.isValid === false || this.form.$valid === false ){
					return;
				}

				if( opts.save === true ){
					this.update({type: 'add', data: this.newUrl.val});
					this.newUrl.val = '';
				}
			};

			this.update = function( action ){
				var oldList = angular.copy( this.list );

				if( action.type === 'remove' ){
					this.list.splice( action.data, 1 );
				} else if( action.type === 'add' ){
					this.list.push( action.data );
				}

				this.changeCB({res: {newVal: this.list, oldVal: oldList }});

				return this.list;
			};
		}
	};
}]);
