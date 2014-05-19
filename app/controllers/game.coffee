#GameController manages the application state of each individual game listed. The needs property gives the controller access to the GamesController so that it can bind the data of it's own properties to that of the controller higher up.

Xvote.GameController = Em.ObjectController.extend
	needs: 'games'
	hasAvailableAction: Em.computed.alias 'controllers.games.hasAvailableAction'
	isOwned: Ember.computed.equal('status', 'gotit')