var Lingo = function() {
	var sToImList = function(str) {
		var list = new Immutable.List();
		for (var i = 0; i < str.length; i++) {
			list = list.push(str[i]);
		}
		return list;
	};

	var words = Immutable.Seq.of('JOLLE', 'KEVIN', 'KNAKO').map(sToImList);
	var currentGuess = new Immutable.List();
	var wordIndex = 0;
	var numberOfCharacters = 5;
	var guessesPerWord = 5;
	var currentWord = words.get(wordIndex);
	
	var guessHasEnoughLetters = function() {
		return currentGuess.size >= currentWord.size;
	};
	
	var onLetter = function(letter) {
		if (guessHasEnoughLetters()) return;
		
		currentGuess = currentGuess.push(letter);
		Dispatcher.Publish('guessUpdate', {guess: currentGuess});
	};
	
	var onGuessFinalized = function() {
		if (!guessHasEnoughLetters()) return;
		
		Dispatcher.Publish('guessFinalized', { });
	};
	
	this.Start = function() {
		Dispatcher.Subscribe('letterTyped', function(message) {onLetter(message.letter)});
		Dispatcher.Subscribe('finalizeGuessKey', function(message) {onGuessFinalized();});
		Dispatcher.Publish('started', {numberOfCharacters: numberOfCharacters, guessesPerWord: guessesPerWord})
	};
};