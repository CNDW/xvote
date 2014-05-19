#filtered route
Xvote.GamesUnownedRoute = Em.Route.extend
	model: ->
		@store.filter 'game', (game)->
			game.get 'status', 'wantit'
#use the same template as the GamesIndexController but it's own controller
	renderTemplate: (controller)->
		@render 'games/index', controller: controller