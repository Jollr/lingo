var Letter = function(asChar, overwritable, initialState) {
	var state = '';
	if (!initialState) { state = 'open'; }
	else { state = initialState; }
	
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
	this.IsOverwritable = function() {
		return overwritable;
	};
};

var Guess = function(word) {
	var letters = Immutable.List.of(new Letter(word.get(0).AsChar(), false, 'correct'))
		.concat(Immutable.Range(1, word.size).map( function() { return new Letter('.', true); }))
		.toList();
	
	this.IsFinished = function() {
		return !letters.some(function(l) { return l.IsOverwritable(); });
	};
	
	this.Add = function(letter) {
		var index = Immutable.Range(0, word.Size)
			.filter(function (i) { return letters.get(i).IsOverwritable(); })
			.first();
		
		letters = letters.set(index, letter);
	};
	
	this.Set = function(letter, index) {
		letters = letters.set(index, letter);
	};
	
	this.GetLetters = function() {
		return letters;
	};
	
	this.Evaluate = function(word) {
		Immutable.Range(0, word.size).forEach(function(index) {letters.get(index).Evaluate(word, index);});
	};
};

var SingleGameOfLingo = function(word) {
	var currentGuess = new Guess(word);
	var guesses = Immutable.List.of(currentGuess);
	
	var nextGuess = function() {
		guesses = guesses.push(currentGuess);
		currentGuess = new Guess(word);
		
		// Prefill already known letters
		Immutable.Range(1, word.size)
			.filter(function(i) {
				return guesses
					.map(function(g) { return g.GetLetters().get(i); })
					.some(function(l) { return l.Equals(word.get(i)); })
			})
			.forEach( function(i) { currentGuess.Set( new Letter(word.get(i).AsChar(), true, 'correct'), i); });
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
		Dispatcher.Publish('guessUpdate', {guess: currentGuess.GetLetters()});
	};
};