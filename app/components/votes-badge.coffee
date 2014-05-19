Xvote.VotesBadgeComponent = Em.Component.extend
	tagName: 'span'
	classNames: 'badge'
	votes: Ember.computed.alias('model.votes')
	layout: Ember.Handlebars.compile "Votes {{votes}}"
	classNameBindings: 'actionable:active'
	#click sends action bubbling up if the actionable attribute passed in through the template is true
	click: ->
		@sendAction('action', @get 'model') if @get 'actionable'