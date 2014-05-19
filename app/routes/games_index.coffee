#child route passes the model data on from the GamesRoute
Xvote.GamesIndexRoute = Em.Route.extend
	model: -> 
		@modelFor('games')