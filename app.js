var LingoApp = function() {
	this.Start = function() {
		var lingo = new Lingo();
		var gui = new Gui();
	};
};

$(function () {
	new LingoApp().Start();
});