var Dispatcher = function() {
	var subscriptions = new Immutable.Map();

	this.Subscribe = function(name, callback) {
		if (!subscriptions.has(name)) {
			subscriptions = subscriptions.set(name, new Immutable.List());
		}
		
		subscriptions = subscriptions.set(
			name,
			subscriptions.get(name).push(callback));
	};
	
	this.Publish = function(name, message) {
		if (subscriptions.has(name)) {
			for (var n = 0; n < subscriptions.get(name).size; n++) {
				subscriptions.get(name).get(n)(message);
			}
		}
	};
};