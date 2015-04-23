var Letter = function(asChar) {
	var state = 'open';
	
	this.Equals = function(otherLetter) { return otherLetter.AsChar() == asChar; }
	this.GetState = function() { return state; }
	this.AsChar = function() { return asChar; }
	this.Evaluate = function(guess, index) {
		if (guess.get(index).Equals(this)) {
			state = 'correct';
		}
		else if (guess.filter(this.Equals).size > 0) {
			state = 'inWord'
		} 
		else {
			state = 'incorrect';
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
	
	this.Evaluate = function(word) {
		Immutable.Range(0, wordSize).forEach(function(index) {letters.get(index).Evaluate(word, index);});
	};
};

var SingleGameOfLingo = function(word) {
	var self = this;
	var currentGuess = new Guess(word.size);
	
	var guesses = Immutable.List.of(currentGuess);
	
	var nextGuess = function() {
		guesses = guesses.push(currentGuess);
		currentGuess = new Guess(word.size);
		
		var knownLetterIndices = Immutable.Range(0, word.size)
			.filter(function(i) {
				return guesses
					.map(function(g) { return g.GetLetters().get(i); })
					.some(function(l) { return l.Equals(word.get(i)); })
			});
		
		Immutable.Range(0, word.size)
			.map(function(i) {
				if (knownLetterIndices.some( function(j) { return i == j; } )) { return word.get(i); }
				else { return new Letter('.'); }
			})
			.forEach(function(l) { currentGuess.Add(l); });
	};
	
	this.Letter = function(letter) {
		if (currentGuess.IsFinished()) return;
		
		currentGuess.Add(letter);
		Dispatcher.Publish('guessUpdate', {guess: currentGuess.GetLetters()});
	};
	
	this.FinalizeGuess = function() {
		if (!currentGuess.IsFinished()) return;
		
		currentGuess.Evaluate(word);
		Dispatcher.Publish('guessUpdate', {guess: currentGuess.GetLetters()});
		Dispatcher.Publish('guessFinalized', { });
		
		nextGuess();
		Dispatcher.Publish('guessUpdate', {guess: currentGuess.GetLetters()});
	};
	
	this.Start = function() {
		self.Letter(word.get(0));
	};
};