var LingoApp = function() {
	window.Dispatcher = new Dispatcher();
	
	this.Start = function() {
		var gui = new Gui();
		var lingo = new Lingo();
		lingo.Start();
	};
};

$(function () {
	new LingoApp().Start();
});