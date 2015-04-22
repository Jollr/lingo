var Input = function() {
	document.onkeydown = function(e) {
		if (e.keyCode == 116) { // f5
			return true;
		}
		
		if (e.keyCode >= 65 && e.keyCode <= 90) { // letter
			Dispatcher.Publish('letterTyped', { letter: String.fromCharCode(e.keyCode).toUpperCase() });
		} 
		
		if (e.keyCode == 13) { // enter
			Dispatcher.Publish('finalizeGuessKey', { });
		}
		
		return false;
	};
};