var Letter = function(asChar, initialState) {
	var state = 'open';
	if (initialState) { state = initialState; }
	
	this.Equals = function(otherLetter) { return otherLetter.AsChar() == asChar; }
	this.GetState = function() { return state; }
	this.AsChar = function() { return asChar; }
	this.Evaluate = function(word, index) {
		if (word.get(index).Equals(this)) {
			state = 'correct';
		}
		else if (word.filter(this.Equals).size > 0) {
			state = 'inWord'
		} 
		else {
			state = 'incorrect';
		}
	};
};

var Guess = function(word) {
	var placeholder = function() { return new Letter('.'); };
	
	var letters = Immutable.List.of(new Letter(word.get(0).AsChar(), 'correct'))
		.concat(Immutable.Range(1, word.size).map( placeholder ))
		.toList();
		
	var nextLetterIndex = 1;
	
	this.IsFinished = function() {
		return nextLetterIndex >= word.size;
	};
	
	this.Add = function(letter) {		
		letters = letters.set(nextLetterIndex, letter);
		nextLetterIndex++;
	};
	
	this.PrefillByPreviousGuesses = function(prevGuesses) {
		Immutable.Range(1, word.size)
			.filter(function(i) {
				return prevGuesses
					.map(function(g) { return g.GetLetters().get(i); })
					.some(function(l) { return l.Equals(word.get(i)); })
			})
			.forEach( function(i) { letters = letters.set( i, new Letter(word.get(i).AsChar(), 'correct')); });
	};
	
	this.GetLetters = function() {
		return letters;
	};
	
	this.Evaluate = function(word) {
		Immutable.Range(0, word.size).forEach(function(index) {letters.get(index).Evaluate(word, index);});
	};
	
	this.Backspace = function() {
		if (nextLetterIndex == 0) {return;}
		nextLetterIndex--;
		letters = letters.set(nextLetterIndex, placeholder());
	};
};

var SingleGameOfLingo = function(word) {
	var currentGuess = new Guess(word);
	var guesses = Immutable.List.of(currentGuess);
	var publishGuessUpdate = function() {Dispatcher.Publish('guessUpdate', {guess: currentGuess.GetLetters()});};
	
	var nextGuess = function() {
		guesses = guesses.push(currentGuess);
		currentGuess = new Guess(word);
		currentGuess.PrefillByPreviousGuesses(guesses);
	};
	
	this.Letter = function(letter) {
		if (currentGuess.IsFinished()) return;
		
		currentGuess.Add(letter);
		publishGuessUpdate();
	};
	
	this.FinalizeGuess = function() {
		if (!currentGuess.IsFinished()) return;
		
		currentGuess.Evaluate(word);
		publishGuessUpdate();
		Dispatcher.Publish('guessFinalized', { });
		
		nextGuess();
		publishGuessUpdate();
	};
	
	this.Backspace = function () {
		currentGuess.Backspace();
		publishGuessUpdate();
	};
	
	this.Start = function() {
		publishGuessUpdate();
	};
};