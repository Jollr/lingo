var Lingo = function() {
	var numberOfCharacters = 5;
	var guessesPerWord = 5;

	var sToImList = function(str) {
		var list = new Immutable.List();
		for (var i = 0; i < str.length; i++) {
			list = list.push(new Letter(str[i]));
		}
		return list;
	};

	var words = Immutable.Seq.of('JOLLE', 'KEVIN', 'KNAKO').map(sToImList);
	var wordIndex = 0;
	var currentWord = words.get(wordIndex);
	var currentGame = new SingleGameOfLingo(currentWord);
	
	var onLetter = function(letter) {
		currentGame.Letter(new Letter(letter));
	};
	
	var onGuessFinalized = function() {
		currentGame.FinalizeGuess();
	};
	
	this.Start = function() {
		Dispatcher.Subscribe('letterTyped', function(message) {onLetter(message.letter)});
		Dispatcher.Subscribe('finalizeGuessKey', function(message) {onGuessFinalized();});
		Dispatcher.Publish('started', {numberOfCharacters: numberOfCharacters, guessesPerWord: guessesPerWord})
		
		currentGame.Start();
	};
};