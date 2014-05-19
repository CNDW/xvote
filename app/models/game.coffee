#the game model, very simple only with the attributes needed
Xvote.Game = DS.Model.extend
	title: DS.attr('string')
	votes: DS.attr('number')
	status: DS.attr('string')