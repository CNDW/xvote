Xvote.Router = Ember.Router.extend()

Xvote.Router.map ->
	@route 'games', path: '/'
	@resource 'games', path: '/games', ->
		@route 'index'
		@route 'owned'
		@route 'unowned'