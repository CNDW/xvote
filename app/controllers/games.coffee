#The GamesController responds to the addGame action from the text-field form in it's view. The hasAvailableAction is a dynamically computed property that checks for the user action restrictions. If none of them are in place, the property is set to true, all other controllers and components look at this property to decide if they will allow the user to vote or add a game.
Xvote.GamesController = Em.ArrayController.extend
	newGame: ''
	hasAvailableAction: (->
		now = new Date()
		day = now.getDay()
		return no if day is 6 || 0
		cookie = $.cookie 'Xvote-HasAction'
		return yes if cookie is undefined
		return no if cookie is 'no'
		).property()
	useAction: ->
		#create a cookie that will expire at midnight of that day that marks that the user has either voted or added a game.
		Xvote.ActionCookie.create()
		#sets the property to false
		@set 'hasAvailableAction', no
	actions:
		addGame: ->
			#retrieve the form data
			gameName = $.trim @get('newGame')
			#variables to set up for validation
			list = @mapBy('title')
			uniq = true

			#checks the form data against games already on the list
			list.forEach (item, index, enumerable)->
				uniq = false if item.toUpperCase() is gameName.toUpperCase()

			#reset the form if the data does not pass validation checks
			if uniq is false
				alert('Game is already on the list!')
				@set 'newGame', ''
				return
			if gameName is ''
				@set 'newGame', ''
				return

			#create a record in the store with temporary data so the view can update instantly
			game = @store.createRecord 'game',
				title: gameName
				votes: 1
				status: 'wantit'

			#function that triggers the locks that prevent more than one user action
			@useAction()
			#setting up for data persistance
			self = this
			game.save().then (value)->
				#callback after the promise has fulfilled that clears the temporary data from the view and replaces it with the newly persisted data from the api, specifically the new ID assigned to the object by the api.
				self.send('updateModels')
				game.deleteRecord()