'use strict';

module.exports = {
	templateUrl: 'components/footer/footer.html',
	bindings: {},
	controller: function (){
		var $ctrl = this;

		$ctrl.events = {
			onClick: function( e, link ){
				if( link === 'options' ){
					chrome.runtime.openOptionsPage()
				}
			}
		}
	}
}
