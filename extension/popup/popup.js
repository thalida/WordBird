var StorageCollection = function(){
	this.items = {};
	chrome.storage.onChanged.addListener( this.onChange.bind(this) );
};

StorageCollection.prototype = {
	add: function( opts ){
		this.items[opts.key] = new StorageItem( opts.key, opts.defaultTo, opts.onChange );
		return this.items[opts.key].get();
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

			console.log( storageItem );

			if( typeof storageItem === 'undefined' ){
				return true;
			}

			var onChangeCB = storageItem.onChange;

			console.log( onChangeCB );

			if( typeof onChangeCB !== 'function'){
				return true;
			}

			console.log( 'before calling onChange' );

			onChangeCB( changedItem.newValue, changedItem.oldValue );
		}.bind(this));
	}
};




var StorageItem = function( key, defaultVal, onChangeCB ){
	var self = this;

	this.key = key;

	this.onChange = onChangeCB || function(){};

	this.get().then(function( data ){
		if( typeof data === 'undefined' ){
			self.set( defaultVal );
			self.onChange( defaultVal );
		} else {
			self.onChange( data );
		}
	});
};

StorageItem.prototype = {
	get: function( cb ){
		var deferred = jQuery.Deferred();
		var key = this.key;

		chrome.storage.sync.get(key, function( data ){
			deferred.resolve( data[key] );
		});

		return deferred;
	},

	set: function( value, cb ){
		var deferred = jQuery.Deferred();
		var key = this.key;
		var storage = {};
		storage[key] = value;

		chrome.storage.sync.set(storage, function( data ){
			deferred.resolve( data );
		});

		return deferred;
	}
};




$(function(){
	var $wordList = $('.js-word_list');
	var $toggleBtn = $('.js-toggle_btn');
	var $enabledStatus = $('.js-enabled_state');
	var storage = new StorageCollection();
	var wordMap;
	var defaultWordMap = {
		'word': 'bird',
		'bird': 'word'
	};

	var render = {
		wordMap: function( map ){
			var wordMapTemplate = [
				'<div class="mapping">',
					'<input class="js-input_original" type="text" placeholder="orignal" value="{{origValue}}" />',
					'<input class="js-input_replacement" type="text" placeholder="replacement" value="{{replacementVal}}" />',
				'</div>'
			].join('');

			function renderInputs( map ){
				$.each(map, function( origValue, replacementVal ){
					var template = wordMapTemplate.replace('{{origValue}}', origValue).replace('{{replacementVal}}', replacementVal);
					$wordList.append( template );
				});
			}

			if( typeof map === 'undefined' ){
				storage.get('wordMap').then( renderInputs );
			} else {
				renderInputs( map );
			}
		},
		toggle: function( state ){
			$enabledStatus.html( " " + state );
		}
	};

	var events = {
		onToggleClick: function(){
			storage
				.get('isEnabled')
				.then(function( currState ){
					storage.set('isEnabled', !currState);
				});
		}
	};

	storage.add({
		key: 'isEnabled',
		defaultTo: true,
		onChange: function( state ){
			render.toggle( state );
		}
	});

	storage.add({
		key: 'wordMap',
		defaultTo: defaultWordMap,
		onChange: function( newWordMap ){
			wordMap = newWordMap;
			render.wordMap( wordMap );
		}
	});

	$toggleBtn.on('click', events.onToggleClick);
});
