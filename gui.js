var Gui = function() {	
	Dispatcher.Subscribe('started', function(message) {
		var playField = new PlayField(message.numberOfCharacters, message.guessesPerWord);
		React.render( 
			React.createElement(playField.GetComponent(), {}),
			$('#guesses')[0]
		);
		/*React.render(
			React.createElement(guessBox(message.numberOfCharacters), {}),
			$('#guesses')[0]
		);*/
	});
};

var PlayField = function(numberOfCharacters, guessesPerWord) {
	var R = React.DOM;
	var boxes = new Immutable.List();
	
	var letterBox = function() {
		return R.div({className: 'charBox'});
	};
	
	for (var n = 0; n < guessesPerWord*numberOfCharacters; n++) {
		boxes = boxes.push(letterBox());
	}
	
	var rows = [];
	for (var n = 0; n < guessesPerWord; n++) {
		var rowChildren = [];
		for (var m = 0; m < numberOfCharacters; m++) {
			rowChildren.push(boxes.get(n*numberOfCharacters + m));
		}
		rows.push(R.div( {children: rowChildren, className: 'guessRow row'}));
	}
	
	this.GetComponent = function () {
		return React.createClass({ 
			render: function() {
				return R.div({
					children: rows
				});
			}
		});
	};
	
	this.Set = function(wordt, at, ch) {
		
	};
};