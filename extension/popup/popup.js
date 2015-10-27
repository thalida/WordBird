var Storage = function( namespace ){
	this.namespace = namespace;
	this.items = {};
};

Storage.prototype = {
	add: function( opts, cb ){
		this.items[opts.key] = new StorageItem( this.namespace + opts.key, opts.defaultTo );
		return this.items[opts.key].get( cb );
	},

	get: function( key, cb ){
		return this.items[key].get( cb );
	},

	set: function( key, value, cb ){
		return this.items[key].set( value );
	}
};

var StorageItem = function( key, defaultVal ){
	var self = this;

	this.key = key;
	this.get(function( data ){
		if( typeof data === 'undefined' ){
			self.set( defaultVal );
		}
	});
};

StorageItem.prototype = {
	get: function( cb ){
		var key = this.key;
		chrome.storage.sync.get(key, function( data ){
			console.log( 'get:', data );
			return cb( data[key] );
		});
	},

	set: function( value, cb ){
		var key = this.key;
		var storage = {};
		storage[key] = value;

		chrome.storage.sync.set(storage);
	}
};

$(function(){
	var storage = new Storage('wordbird__');
	storage.add({key: 'enabled', defaultTo: true}, function( state ){
		$('.js-enabled-state').html( " " + state );
	});
	storage.add({key: 'wordMap', defaultTo: {}});

	var $enableToggle = $('#toggleEnable');
	$enableToggle.on('click', function(){
		storage.get('enabled', function( currState ){
			storage.set('enabled', !currState);
		});
	});
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
		var storageData = changes[key];
		if( key === 'wordbird__enabled' ){
			$('.js-enabled-state').html( " " + storageData.newValue );
		}
	}
});


