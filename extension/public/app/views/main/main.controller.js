'use strict';

module.exports = function( StorageCollection, isPopup ){
    "ngInject";

    var $ctrl = this;
    var isProcessing = false;
    var storage = new StorageCollection();

    $ctrl.isPopup = isPopup;

    storage.add({
        key: 'isEnabled',
        defaultTo: true,
        onChange: function( isEnabled ){
            $ctrl.isEnabled = isEnabled;
        }
    });

    storage.add({
        key: 'wordMap',
        defaultTo: {
            'word': {key: 'word', find: 'word', replace: 'bird'},
            'cloud': {key: 'cloud', find: 'cloud', replace: 'butt'},
            'google': {key: 'google', find: 'google', replace: 'Our Benevolent Lord and Master'}
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

    $ctrl.onToggleUpdate = function( toggle ){
        storage.set('isEnabled', toggle.newVal);
    };

    $ctrl.onMapUpdate = function( map ){
        storage.set('wordMap', map.newVal);
    };

    $ctrl.onBlacklistUpdate = function( list ){
        storage.set('blacklist', list.newVal);
    };
};
