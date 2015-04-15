var Lingo = function() {
	var guesses = Immutable.List.of('jolle', 'kevin', 'knako');
	
	this.GetGuesses = function() {
		return guesses;
	};
	
	this.TestPublish = function() {
		Dispatcher.Publish('test', {a: 'asdf' });
		Dispatcher.Publish('test2', {a: 'qwer' });
	};
};