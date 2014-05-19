Xvote = Ember.Application.create(
  LOG_ACTIVE_GENERATION: true
  LOG_MODULE_RESOLVER: true
  LOG_TRANSITIONS: true
  LOG_TRANSITIONS_INTERNAL: true
  LOG_VIEW_LOOKUPS: true
  )

Ember.RSVP.configure('onerror', (error)->
	console.log(e.message)
	console.log(e.stack)
	if (error instanceof Error)
		Ember.Logger.assert(false, error)
		Ember.Logger.error(error.stack)
)