var Gui = function() {
	
	var onTest = function(message) {
		$('#guesses').html(message.a);
	};
	
	this.TestSubscribe = function() {
		Dispatcher.Subscribe('test2', onTest);
		
		Dispatcher.Subscribe('test', function(message) {
			console.log(message.a);
		});
	};
};