// Inspiration/Helpers
// http://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945
// http://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings

var StringReplacer = function( map, config ){
	this.touchedNodes = [];
	this.set('wordMap', map);
};

StringReplacer.prototype = {
	run: function( startNode ){
		this.touchedNodes = [];
		this.walk( startNode );
	},

	set: function( key, value ){
		this[key] = value;

		if( key === 'wordMap' ){
			if( typeof value === 'undefined' ){
				this.hasMap = false;
			} else {
				this.regex = this.createRegex();
			}
		}
	},

	createRegex: function(){
		this.keys = Object.keys(this.wordMap);
		this.hasMap = this.keys.length > 0;

		if( this.hasMap === false ){
			return;
		}

		var keysQuery = this.keys.join('|');
		var regexStr = '\\b(' + keysQuery + ')\\b';
		return new RegExp(regexStr, 'gi');
	},

	walk: function( node ){
		if( this.hasMap === false ){
			return;
		}

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
		textNode.nodeValue = this.replaceWords(textNode);
	},

	replaceWords: function( node ){
		var wordMap = this.wordMap;
		var origNodeValue = node.nodeValue;

		return origNodeValue.replace(this.regex, function( matchedStr, foundStr ){
			this.touchedNodes.push({node: node, origValue: origNodeValue});

			var replacementStr = wordMap[foundStr.toLowerCase()].replace;
			var result = matchedStr.replace(foundStr, replacementStr);

			if( matchedStr.charAt(0) === matchedStr.charAt(0).toUpperCase() ){
				result = result.charAt(0).toUpperCase() + result.slice(1);
			}

			return result;
		}.bind(this));
	}
};

var WordBird = function(){
	this.isProcessing = false;
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

	run: function( ){
		if( this.isProcessing === true ){
			return;
		}

		this.isProcessing = true;
		this.getStorage('isEnabled', this.onGetEnabled.bind(this));
	},

	reset: function(){
		if( this.isProcessing === true ){
			return;
		}

		this.isProcessing = true;

		var nodes = this.strReplacer.touchedNodes;
		var totalNodes = nodes.length;

		for(var i = 0; i < totalNodes; i += 1){
			var currItem = nodes[i];
			currItem.node.nodeValue = currItem.origValue;
		}

		this.isProcessing = false;
	},

	onGetEnabled: function( isEnabled ){
		if( isEnabled !== true ){
			this.isProcessing = false;
			return;
		}

		this.getStorage('blacklist', this.onGetBlacklist.bind(this));
	},

	onGetBlacklist: function( blacklist ){
		var currUrl = window.location.href;
		var totalBlacklist = blacklist.length;
		var isBlacklisted = false;

		for(var i = 0; i < totalBlacklist; i += 1 ){
			var url = blacklist[i];
			if( currUrl.indexOf( url ) >= 0 ){
				isBlacklisted = true;
				break;
			}
		}

		if( isBlacklisted ){
			this.isProcessing = false;
			return;
		}

		this.getStorage('wordMap', this.onGetWordMap.bind(this));
	},

	onGetWordMap: function( wordMap ){
		this.strReplacer.set('wordMap', wordMap);
		this.strReplacer.run( document.body );
		this.isProcessing = false;
	},

	onStorageChange: function(changes, namespace) {
		for( var key in changes ){
			var storageData = changes[key];

			if( key === 'isEnabled' ){
				if( storageData.newValue === true ){
					this.run();
				} else {
					this.reset();
				}
			} else if( key === 'wordMap' || key === 'blacklist' ){
				this.reset();
				this.run();
			}
		}
	}
};

new WordBird();
