var Input = function() {
	document.onkeydown = function(e) {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			Dispatcher.Publish('letterTyped', { letter: String.fromCharCode(e.keyCode).toUpperCase() });
			return false;
		}
		
		//return false;
	};
};