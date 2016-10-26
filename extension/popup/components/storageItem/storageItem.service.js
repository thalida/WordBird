'use strict';

app.service('StorageItem', ['$q', function( $q ){
	var StorageItem = function( key, defaultVal, onChangeCB ){
		var self = this;

		this.key = key;

		this.onChange = onChangeCB || function(){};

		this.get().then(function( data ){
			if( typeof data === 'undefined' ){
				this.set( defaultVal );
				this.onChange( defaultVal );
			} else {
				this.onChange( data );
			}
		}.bind(this));
	};

	StorageItem.prototype = {
		get: function( cb ){
			var key = this.key;
			return $q(function(resolve, reject){
				chrome.storage.sync.get(key, function( data ){
					resolve( data[key] );
				});
			});
		},

		set: function( value, cb ){
			var key = this.key;
			var storage = {};
			storage[key] = value;

			return $q(function(resolve, reject){
				chrome.storage.sync.set(storage, function( data ){
					if( chrome.runtime.lastError ){
    					reject( chrome.runtime.lastError );
    				} else {
    					resolve();
    				}
				});
			});
		}
	};

	return StorageItem;
}]);
