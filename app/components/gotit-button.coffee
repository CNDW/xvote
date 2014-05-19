#Compnents are designed to be abstract, customized html tags specifically for user interaction

Xvote.GotitButtonComponent = Em.Component.extend
	tagName: 'button'
	classNames: 'btn btn-lg'
	layout: Ember.Handlebars.compile "{{model.status}}"
	#changes the button's color based on ownership status by changing css classes
	classNameBindings: 'buttonStatus:btn-success:btn-danger'
	#click event that sends the action passed in through the attributes bubbling up to the GamesRoute. The context's model is a parameter for the action.
	click: ->
		@sendAction('action', @get 'model')