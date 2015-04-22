var Gui = function() {	
	var playField;
	var letterGrid = new LetterGrid();
	
	var render = function() {
		React.render( 
			React.createElement(playField.GetComponent(), {}),
			$('#guesses')[0]
		);
	};
	
	Dispatcher.Subscribe('started', function(message) {
		playField = new PlayField(message.numberOfCharacters, message.guessesPerWord, letterGrid);
		render();
	});
	
	Dispatcher.Subscribe('guessUpdate', function(message) {
		letterGrid.UpdateCurrentGuess(message.guess);
		render();
	});
	
	Dispatcher.Subscribe('guessFinalized', function(message) {
		letterGrid.FinalizeCurrentGuess();
		render();
	});
};

var LetterGrid = function() {
	var grid = Immutable.List.of(new Immutable.List());
	
	this.UpdateCurrentGuess = function(guess) {
		grid = grid.set(grid.size - 1, guess);
	};
	
	this.FinalizeCurrentGuess = function() {
		grid = grid.push(new Immutable.List());
	};
	
	this.At = function(wordIndex, letterIndex) {
		if (wordIndex >= grid.size) return '';
		var word = grid.get(wordIndex);
		
		if (letterIndex >= word.size) return '';
		return word.get(letterIndex).AsChar();
	};
};

var PlayField = function(numberOfCharacters, guessesPerWord, letterGrid) {
	var R = React.DOM;
	
	var letterBox = function(wordIndex, letterIndex) {
		return R.div({
			children: R.span(null, letterGrid.At(wordIndex, letterIndex)),
			className: 'charBox'
		});
	};
	
	var guessRow = function(children) {
		return R.div( {
			children: children, 
			className: 'guessRow row'});
	};
	
	var rowDivs = Immutable
		.Range(0, guessesPerWord)
		.map(function(i) {
			return Immutable.Range(0, numberOfCharacters).map(
				function(j) {
					return letterBox(i, j);
				}
			).toArray(); })
		.map(guessRow);

	this.GetComponent = function () {
		return React.createClass({ 
			render: function() {
				return R.div({
					children: rowDivs.toArray()
				});
			}
		});
	};
};