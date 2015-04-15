var LingoApp = function() {
	window.Dispatcher = new Dispatcher();
	
	this.Start = function() {
		var gui = new Gui();
		var lingo = new Lingo();
		
		gui.TestSubscribe();
		lingo.TestPublish();
	};
};

$(function () {
	new LingoApp().Start();
});