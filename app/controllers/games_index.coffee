#The gamesIndex, GamesOwned, and GamesUnowned controllers are all children of the GamesController with special sorting computed properties to manage the list orders
Xvote.GamesIndexController = Em.ArrayController.extend
	#creates two lists separated by game status
	unowned: Em.computed.filterBy 'content', 'status', 'wantit'
	owned: Em.computed.filterBy 'content', 'status', 'gotit'
	#custom computed sorting that will dynamicly update with the data
	arrangedOwned: Em.computed.sort('owned', (a, b)->
		if a.get('title') < b.get('title')
			return -1
		else if a.get('title') > b.get('title')
			return 1
		return 0
		)
	arrangedUnowned: Em.computed.sort('unowned', (a, b)->
		b.get('votes') - a.get('votes')
		)