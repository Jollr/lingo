var Letter = function(asChar) {
	var state = 'open';
	
	this.Equals = function(otherLetter) { return otherLetter.AsChar() == asChar; }
	this.GetState = function() { return state; }
	this.AsChar = function() { return asChar; }
	this.Evaluate = function(guess, index) {
		if (guess.get(index).Equals(this)) {
			state = 'correctSpot';
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