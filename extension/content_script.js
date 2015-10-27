// Inspiration/Helpers
// http://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945
// http://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings

var StringReplacer = function( map ){
	console.log( 'word map:', map );
	this.wordMap = {
		// 'and': '--and--',
		// 'of': '((of))',
		'the': '((the))'
	};

    this.regex = this.createRegex();
};

StringReplacer.prototype = {
	run: function( startNode ){
		this.walk( startNode );
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

var init = function(){
	var namespace = 'wordbird__';
	var wordMapkey = namespace + 'wordMap';

	function getEnabledState( cb ){
		var key = namespace + 'enabled';
		chrome.storage.sync.get(key, function( data ){
			return cb( data[key] );
		});
	}

	function getWordMap( cb ){
		var key = namespace + 'wordMap';
		chrome.storage.sync.get(key, function( data ){
			return cb( data[key] );
		});
	}

	getEnabledState(function( state ){
		var isEnabled = state;
		if( isEnabled ){
			getWordMap(function(map){
				new StringReplacer( map ).run( document.body );
			});
		}
	});
};

chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (var key in changes) {
    	var storageData = changes[key];
		if( key === 'wordbird__enabled' ){
			if( storageData.newValue === true ){
				init();
			} else {
				window.location.reload( false );
			}
		}
    }
});

init();
