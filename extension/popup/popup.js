$(function(){
	var storage = {
		namespace: 'wordbird__',
		get: function( key ){
			return localStorage.getItem( storage.namespace + key );
		},
		set: function( key, val ){
			localStorage.setItem( storage.namespace + key, val );
			return storage.get( key );
		}
	};

	var settings = {
		enabled: storage.get('enabled') || true
	};

	var $enableToggle = $('#toggleEnable');
	$enableToggle.on('click', function(){
		storage.set( 'enabled', !settings.enabled );
		settings.enabled = !settings.enabled;
	});
});