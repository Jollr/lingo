var Gui = function() {
	var R = React.DOM;
	
	var charInput = function() {
		return R.div({className: 'charBox'});
	};
	
	var guessBox = function(numberOfCharacters) {
		return React.createClass({ 
			render: function() {
				var inputs = [];
				for (var n = 0; n < numberOfCharacters; n++) {
					inputs.push(charInput());
				}
				return R.div({
					children: inputs
				});
			}
		});
	};
	
	Dispatcher.Subscribe('started', function(message) {
		React.render(
			React.createElement(guessBox(message.numberOfCharacters), {}),
			$('#guesses')[0]
		);
	});
};