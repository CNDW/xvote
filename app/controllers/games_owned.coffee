Xvote.GamesOwnedController = Em.ArrayController.extend
	#set up the filtered list
	owned: Em.computed.filterBy 'content', 'status', 'gotit'
	#sorting the list
	arrangedOwned: Em.computed.sort('owned', (a, b)->
		if a.get('title') < b.get('title')
			return -1
		else if a.get('title') > b.get('title')
			return 1
		return 0
		)