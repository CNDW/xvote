#filtered route
Xvote.GamesOwnedRoute = Em.Route.extend
	model: ->
		@store.filter 'game', (game)->
			game.get 'status', 'gotit'
	#use the same template as GamesIndex but it's own controller
	renderTemplate: (controller)->
		@render 'games/index', controller: controller