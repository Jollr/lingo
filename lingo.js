var Lingo = function() {
	var guesses = Immutable.List.of('jolle', 'kevin', 'knako');
	
	this.GetGuesses = function() {
		return guesses;
	};
};