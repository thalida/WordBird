'use strict';

module.exports = function( StorageCollection ){
    "ngInject";

    var $ctrl = this;
    var isProcessing = false;
    var storage = new StorageCollection();

    storage.add({
        key: 'wordMap',
        defaultTo: {
            'word': 'bird',
            'cloud': 'butt',
            'google': 'Our Benevolent Lord and Master'
        },
        onChange: function( wordMap ){
            $ctrl.wordMap = wordMap;
        }
    });

    storage.add({
        key: 'blacklist',
        defaultTo: ['inbox.google.com', 'mail.google.com', 'calendar.google.com'],
        onChange: function( blacklist ){
            $ctrl.blacklist = blacklist;
        }
    });

    $ctrl.onMapUpdate = function( map ){
        storage.set('wordMap', map.newVal);
    };

    $ctrl.onBlacklistUpdate = function( list ){
        console.log( list );
        storage.set('blacklist', list.newVal);
    };
};
