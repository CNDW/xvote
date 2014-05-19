Xvote.GamesRoute = Em.Route.extend
	model: -> 
		#fetches the data from the store with a promise object that will handle a retrieval error with a message and allow the app to continue
		@store.find('game').then (value)->
			return value
		, (rejection)->
			alert('Connection error: unable to communicate with server.')

	actions:
		#these actions are triggered by bubbling from components and views down the heiarchy
		ownGame: (game)->
			#escape function to prevent multiple saves to the store
			return if game.get('status') is 'gotit'
			game.set 'status', 'gotit'
			game.save()
		vote: (game)->
			#updates the vote count and tells the controller not to allow any further action
			game.incrementProperty 'votes'
			game.save()
			@controllerFor('games').set 'hasAvailableAction', no
			Xvote.ActionCookie.create()
		updateModels: ->
			#reloads the changed data from the api
			this.refresh()
