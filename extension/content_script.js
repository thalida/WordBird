// Inspiration/Helpers
// http://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945
// http://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings

var StringReplacer = function( map, config ){
	if( typeof map !== 'undefined' ){
		this.wordMap = map;
		this.regex = this.createRegex();
	}
};

StringReplacer.prototype = {
	run: function( startNode ){
		this.walk( startNode );
	},

	set: function( key, value ){
		this[key] = value;
		if( key === 'wordMap' ){
			this.regex = this.createRegex();
		}
	},

	createRegex: function(){
		var keysQuery = Object.keys(this.wordMap).join('|');
		var regexStr = '\\b(' + keysQuery + ')\\b';
		return new RegExp(regexStr, 'gi');
	},

	walk: function( node ){
		var child, next;

		switch ( node.nodeType ){
			case 1:  // Element
			case 9:  // Document
			case 11: // Document fragment
				child = node.firstChild;

				while( child ){
					next = child.nextSibling;
					this.walk( child );
					child = next;
				}

				break;

			case 3: // Text node
				this.handleTextNode( node );
				break;
		}
	},

	handleTextNode: function( textNode ){
		textNode.nodeValue = this.replaceWords(textNode.nodeValue);
	},

	replaceWords: function( str ){
		var wordMap = this.wordMap;

		return str.replace(this.regex, function( matchedStr, foundStr ){
			var replacementStr = wordMap[foundStr.toLowerCase()];
			var result = matchedStr.replace(foundStr, replacementStr);

			if( matchedStr.charAt(0) === matchedStr.charAt(0).toUpperCase() ){
				result = result.charAt(0).toUpperCase() + result.slice(1);
			}

			return result;
		});
	}
};

var WordBird = function(){
	this.strReplacer = new StringReplacer();
	this.run();
	chrome.storage.onChanged.addListener( this.onStorageChange.bind(this) );
};

WordBird.prototype = {
	getStorage: function( key, cb ){
		chrome.storage.sync.get(key, function( data ){
			return cb( data[key] );
		});
	},

	run: function(){
		if( this.hasBeenRun === true ){
			return;
		}

		this.getStorage('isEnabled', function( isEnabled ){
			if( isEnabled !== true ){
				return;
			}

			this.getStorage('wordMap', function( wordMap ){
				this.hasBeenRun = true;
				this.strReplacer.set('wordMap', wordMap);
				this.strReplacer.run( document.body );
			}.bind(this));
		}.bind(this));
	},

	disable: function(){
		// if( window.confirm('WirdBird needs to refresh') ){
		// 	window.location.reload( false );
		// }
	},

	onStorageChange: function(changes, namespace) {
		for (var key in changes) {
			var storageData = changes[key];
			var newValue = storageData.newValue;
			var oldValue = storageData.oldValue;

			if( key === 'isEnabled' ){
				if( newValue === true ){
					this.run();
				} else {
					this.disable();
				}
			} else if( key === 'wordMap' ){
				this.hasBeenRun = false;
			}
		}
	}
};

new WordBird();
