// http://stackoverflow.com/questions/5904914/javascript-regex-to-replace-text-not-in-html-attributes/5904945#5904945
// http://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings

walk( document.body );

function walk( node ){
	var child, next;

	switch ( node.nodeType ){
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;

			while( child ){
				next = child.nextSibling;
				walk( child );
				child = next;
			}

			break;

		case 3: // Text node
			handleText( node );
			break;
	}
}

function replaceAll( str, mapObj ){
    var re = new RegExp(Object.keys(mapObj).join("|"),"gi");

    return str.replace(re, function(matched){
        return mapObj[matched.toLowerCase()];
    });
}

function handleText( textNode ){
	var wordMap = {
		'and': 'fooooo',
		'of': 'barrrr',
		'the': 'helloooo'
	};
	
	textNode.nodeValue = replaceAll(textNode.nodeValue, wordMap);
}

function onStorageChange( evt ){
	console.log( evt )
}

window.addEventListener('storage', onStorageChange, false);