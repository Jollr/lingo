var Lingo = function() {
	var guesses = Immutable.List.of('jolle', 'kevin', 'knako');
	
	Dispatcher.Publish('newGuess', {guesses: guesses});
};