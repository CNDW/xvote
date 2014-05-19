Xvote.GamesUnownedController = Em.ArrayController.extend
	#setting up the filtered list
	unowned: Em.computed.filterBy 'content', 'status', 'wantit'
	#sorting the list
	arrangedUnowned: Em.computed.sort('unowned', (a, b)->
		b.get('votes') - a.get('votes')
		)