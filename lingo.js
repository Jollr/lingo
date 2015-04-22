var Letter = function(asChar) {
	var state = 'open';
	
	this.EqualTo = function(otherLetter) { return otherLetter.AsChar() == asChar; }
	this.GetState = function() { return state; }
	this.AsChar = function() { return asChar; }
	this.Evaluate = function(guess, index) {
		if (guess.get(index).Equals(this)) {
			status = 'correctSpot';
		}
		else if (guess.filter(EqualTo).size > 0) {
			status = 'inWord'
		} 
		else {
			status = 'incorrect';
		}
	};
};

var Guess = function(wordSize) {
	var letters = new Immutable.List();
	
	this.IsFinished = function() {
		return letters.size >= wordSize;
	};
	
	this.Add = function(letter) {
		letters = letters.push(letter);
	};
	
	this.GetLetters = function() {
		return letters;
	};
};

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
	
	var currentGuess = new Guess(numberOfCharacters);
	var currentWord = words.get(wordIndex);
	
	var onLetter = function(letter) {
		if (currentGuess.IsFinished()) return;
		
		currentGuess.Add(new Letter(letter));
		Dispatcher.Publish('guessUpdate', {guess: currentGuess.GetLetters()});
	};
	
	var onGuessFinalized = function() {
		if (!currentGuess.IsFinished()) return;
		
		currentGuess = new Guess(numberOfCharacters);
		Dispatcher.Publish('guessFinalized', { });
	};
	
	this.Start = function() {
		Dispatcher.Subscribe('letterTyped', function(message) {onLetter(message.letter)});
		Dispatcher.Subscribe('finalizeGuessKey', function(message) {onGuessFinalized();});
		Dispatcher.Publish('started', {numberOfCharacters: numberOfCharacters, guessesPerWord: guessesPerWord})
	};
};