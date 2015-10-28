'use strict';

app.service('StorageCollection',['StorageItem', function( StorageItem ){
	var StorageCollection = function(){
		this.items = {};
		chrome.storage.onChanged.addListener( this.onChange.bind(this) );
	};

	StorageCollection.prototype = {
		add: function( opts ){
			this.items[opts.key] = new StorageItem( opts.key, opts.defaultTo, opts.onChange );
			return this.get( opts.key );
		},

		get: function( key ){
			return this.items[key].get();
		},

		set: function( key, value ){
			return this.items[key].set(value);
		},

		onChange: function(changes, namespace) {
			$.each(changes, function(key, changedItem){
				var storageItem = this.items[key];

				if( typeof storageItem === 'undefined' ){
					return true;
				}

				var onChangeCB = storageItem.onChange;

				if( typeof onChangeCB !== 'function'){
					return true;
				}

				onChangeCB( changedItem.newValue, changedItem.oldValue );
			}.bind(this));
		}
	};

	return StorageCollection;
}]);
