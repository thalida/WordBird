var toggle = {
	key: 'isEnabled',
	defaultState: true,
	get: function( cb ){
		chrome.storage.sync.get(toggle.key, function( data ){
			var state = data[toggle.key];
			if( typeof state === 'undefined' ){
				state = toggle.defaultState;
			}
			cb( state );
		});
	},
	set: function( value, cb ){
		var key = toggle.key;
		var storage = {};
		storage[key] = value;

		chrome.storage.sync.set(storage, function(){
			if( chrome.runtime.lastError ){
				throw Error(chrome.runtime.lastError);
			} else {
				cb();
			}
		});
	}
};

var icon = {
	paths: {
		on: 'icons/icon-on.19.png',
		off: 'icons/icon-off.19.png'
	},
	set: function( state ){
		var type = ( state ) ? 'on' : 'off';
		chrome.browserAction.setIcon({ path: icon.paths[type] });
	}
};

var events = {
	init: function(){
		toggle.get( icon.set );
		// chrome.browserAction.onClicked.addListener( events.onClick );
		chrome.runtime.onInstalled.addListener( events.onInstall );
	},
	onInstall: function( details ){
		if( details.reason === 'install' ){
			if (chrome.runtime.openOptionsPage) {
				chrome.runtime.openOptionsPage();
			} else {
				window.open(chrome.runtime.getURL('options/index.html'));
			}
		}
	},
	onClick: function ( tab ) {
		toggle.get(function( state ){
			toggle.set(!state, function(){
				icon.set( !state );
			});
		});
	}
};

events.init();
