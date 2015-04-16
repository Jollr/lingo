var Lingo = function() {
	//var guesses = Immutable.List.of('jolle', 'kevin', 'knako');
	var numberOfCharacters = 6;
	
	this.Start = function() {
		Dispatcher.Publish('started', {numberOfCharacters: numberOfCharacters});
	};
};