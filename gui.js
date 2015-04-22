var Gui = function() {	
	var playField;
	Dispatcher.Subscribe('started', function(message) {
		playField = new PlayField(message.numberOfCharacters, message.guessesPerWord);
		React.render( 
			React.createElement(playField.GetComponent(), {}),
			$('#guesses')[0]
		);
	});
	
	Dispatcher.Subscribe('guessUpdate', function(message) {
		//playField.UpdateGuess(message.guess);
	});
};

var PlayField = function(numberOfCharacters, guessesPerWord) {
	var R = React.DOM;
	var rows = new Immutable.List();
	var rowIndex = 0;
	
	var letterBox = function() {
		return R.div({className: 'charBox'});
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