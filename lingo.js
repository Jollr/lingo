var Lingo = function() {
	//var guesses = Immutable.List.of('jolle', 'kevin', 'knako');
	var numberOfCharacters = 10;
	
	this.Start = function() {
		Dispatcher.Publish('started', {numberOfCharacters: numberOfCharacters});
	};
};