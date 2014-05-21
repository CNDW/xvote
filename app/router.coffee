Xvote.Router = Ember.Router.extend()

Xvote.Router.map ->
	@route 'games', path: '/'
	@resource 'games', ->
		@route 'index', path: '/'
		@route 'owned'
		@route 'unowned'