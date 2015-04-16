var Gui = function() {
	var R = React.DOM;
	
	var Guessbox = React.createClass({ 
		render: function() {
			return R.div({
				children: 'Hello world!'
				/*children: [ 
					R.input({type: "text"}),
					R.input({type: "text"})
				]*/
			});
		}
	});

	React.render(
		React.createElement(Guessbox, {}),
		//$('#guesses')
		document.getElementById('guesses')
	);
};