#helper method to make cookie creation simpler
Xvote.ActionCookie = 
	create: ->
		#creates a new datetime and sets it to midnight of this day, times are calculated off of computer clock, and set as GMT. Midnight for Central will be +5 hours with daylight savings time factored in, ect ect.
		exp = new Date() 
		exp.setHours 23, 59, 59
		$.cookie 'Xvote-HasAction', 'no', expires: exp
