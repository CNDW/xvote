###
The Xvote.ApplicationAdapter is a custom built adapter built to fit the given backend api. The bulk of the logic around communicating with the api is in this class, making the rest of the app api neutral. Should new api needs come up, then all that would change is the adapter, the rest of the app is completely unaware of what happens in the backend.
###
Xvote.ApplicationAdapter = DS.Adapter.extend
	#api specific variables
	hostName: 'http://js.november.sierrabravo.net/challenge/'
	apiKey: '2790e3732a4593034a9759348b87587d'

	#redirect the find function as the api only supports findAll
	find: (store, type, id)->
		@findAll(store, type)

	#Retrieve the game records from the api, the ember store will cache and only reload when the need arises
	findAll: (store)->
		url = @hostName
		key = @apiKey
		return new Ember.RSVP.Promise (resolve, reject)->
			$.ajax(
				dataType: 'jsonp'
				jsonpCallback: 'getGames'
				url: url + "getGames"
				data: {apiKey: key}
				type: "GET"
				cache: true
			).success((data)-> #return promise on success
				Ember.run(null, resolve, data)
			).error( -> #return rejection on failure
				Ember.run(null, reject)
			)


	updateRecord: (store, type, record)->
		url = @hostName
		key = @apiKey
		#To accomidate the api, we only want the attributes that have changed. Since the app only allows you to either vote or mark as owned, we only need to focus on those 2 properties
		changedAttributes = record.get('_inFlightAttributes')

		if changedAttributes.hasOwnProperty('votes')
			recordId = record.get('id')
			return new Ember.RSVP.Promise (resolve, reject)->
				$.ajax(
					dataType: 'jsonp'
					jsonpCallback: 'addVote'
					url: url + "addVote"
					data: {apiKey: key, id: recordId}
					type: "GET"
					cache: true
				).success((data)->
					Ember.run(null, resolve)
				).error( ->
					Ember.run(null, reject)
				)

		else
			recordId = record.get('id')
			return new Ember.RSVP.Promise (resolve, reject)->
				$.ajax(
					dataType: 'jsonp'
					jsonpCallback: 'setGotit'
					url: url + "setGotit"
					data: {apiKey: key, id: recordId}
					type: "GET"
					cache: true
				).success((data)->
					Ember.run(null, resolve)
				).error( ->
					Ember.run(null, reject)
				)

	#creating new game record
	createRecord: (store, type, record)->
		title = record.get('title')
		#"sanatizing" inputs to prevent sql injection... more like dirtying...
		sanitize = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g")
		title = title.replace(sanitize, "\\$&")
		model = record
		url = @hostName
		key = @apiKey
		return new Ember.RSVP.Promise (resolve, reject)->
			$.ajax(
				dataType: 'jsonp'
				jsonpCallback: 'addGame'
				url: url + "addGame"
				data: {apiKey: key, title: title}
				type: "GET"
				cache: true
			).success((data)->
				Ember.run(null, resolve)
			).error( ->
				Ember.run(null, reject)
			)
