var Gui = function() {	
	var playField;
	var letterGrid = new LetterGrid();
	
	Dispatcher.Subscribe('started', function(message) {
		playField = new PlayField(message.numberOfCharacters, message.guessesPerWord, letterGrid);
		React.render( 
			React.createElement(playField.GetComponent(), {}),
			$('#guesses')[0]
		);
	});
	
	Dispatcher.Subscribe('guessUpdate', function(message) {
		//playField.UpdateGuess(message.guess);
	});
};

var LetterGrid = function() {
	var grid = Immutable.List.of(new Immutable.List());
	
	this.At = function(wordIndex, letterIndex) {
		if (wordIndex > grid.size) return '';
		var word = grid.get(wordIndex);
		
		if (letterIndex > word.size) return '';
		return word.get(letterIndex);
	};
};

var PlayField = function(numberOfCharacters, guessesPerWord, letterGrid) {
	var R = React.DOM;
	
	var letterBox = function() {
		return R.div({
			children: R.span(null, letterGrid.At(0, 0)),
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
		.map(function() {return Immutable.Range(0, numberOfCharacters).map(letterBox).toArray(); })
		.map(guessRow)
		.toArray();
	

	this.GetComponent = function () {
		return React.createClass({ 
			render: function() {
				return R.div({
					children: rowDivs
				});
			}
		});
	};
	
	/*this.UpdateGuess = function(guess) {
		var row = rows.get(rowIndex);
		var n = 0;
		for (n = 0; n < guess.size; n++) {
			row.get(n).html(guess.get(n));
		}
	};*/
};