var Lingo = function() {
	var words = Immutable.List.of('JOLLE', 'KEVIN', 'KNAKO');
	var wordIndex = 0;
	var numberOfCharacters = 5;
	var guessesPerWord = 6;
	var currentWord = words.get(wordIndex);
	
	var onLetter = function(letter) {
		console.log(letter);
	};
	
	this.Start = function() {
		Dispatcher.Subscribe('letterTyped', function(message) {onLetter(message.letter)});
		Dispatcher.Publish('started', {numberOfCharacters: numberOfCharacters, guessesPerWord: guessesPerWord})
		//Dispatcher.Publish('newWord', {firstLetter: currentWord.charAt(0), numberOfCharacters: numberOfCharacters});
	};
};