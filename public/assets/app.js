var Xvote;

Xvote = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true
});

Ember.RSVP.configure('onerror', function(error) {
  console.log(e.message);
  console.log(e.stack);
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    return Ember.Logger.error(error.stack);
  }
});

Xvote.Router = Ember.Router.extend();

Xvote.Router.map(function() {
  this.route('games', {
    path: '/'
  });
  return this.resource('games', {
    path: '/games'
  }, function() {
    this.route('index');
    this.route('owned');
    return this.route('unowned');
  });
});


/*
The Xvote.ApplicationAdapter is a custom built adapter built to fit the given backend api. The bulk of the logic around communicating with the api is in this class, making the rest of the app api neutral. Should new api needs come up, then all that would change is the adapter, the rest of the app is completely unaware of what happens in the backend.
 */
Xvote.ApplicationAdapter = DS.Adapter.extend({
  hostName: 'http://js.november.sierrabravo.net/challenge/',
  apiKey: '2790e3732a4593034a9759348b87587d',
  find: function(store, type, id) {
    return this.findAll(store, type);
  },
  findAll: function(store) {
    var key, url;
    url = this.hostName;
    key = this.apiKey;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      return $.ajax({
        dataType: 'jsonp',
        jsonpCallback: 'getGames',
        url: url + "getGames",
        data: {
          apiKey: key
        },
        type: "GET",
        cache: true
      }).success(function(data) {
        return Ember.run(null, resolve, data);
      }).error(function() {
        return Ember.run(null, reject);
      });
    });
  },
  updateRecord: function(store, type, record) {
    var changedAttributes, key, recordId, url;
    url = this.hostName;
    key = this.apiKey;
    changedAttributes = record.get('_inFlightAttributes');
    if (changedAttributes.hasOwnProperty('votes')) {
      recordId = record.get('id');
      return new Ember.RSVP.Promise(function(resolve, reject) {
        return $.ajax({
          dataType: 'jsonp',
          jsonpCallback: 'addVote',
          url: url + "addVote",
          data: {
            apiKey: key,
            id: recordId
          },
          type: "GET",
          cache: true
        }).success(function(data) {
          return Ember.run(null, resolve);
        }).error(function() {
          return Ember.run(null, reject);
        });
      });
    } else {
      recordId = record.get('id');
      return new Ember.RSVP.Promise(function(resolve, reject) {
        return $.ajax({
          dataType: 'jsonp',
          jsonpCallback: 'setGotit',
          url: url + "setGotit",
          data: {
            apiKey: key,
            id: recordId
          },
          type: "GET",
          cache: true
        }).success(function(data) {
          return Ember.run(null, resolve);
        }).error(function() {
          return Ember.run(null, reject);
        });
      });
    }
  },
  createRecord: function(store, type, record) {
    var key, model, sanitize, title, url;
    title = record.get('title');
    sanitize = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g");
    title = title.replace(sanitize, "\\$&");
    model = record;
    url = this.hostName;
    key = this.apiKey;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      return $.ajax({
        dataType: 'jsonp',
        jsonpCallback: 'addGame',
        url: url + "addGame",
        data: {
          apiKey: key,
          title: title
        },
        type: "GET",
        cache: true
      }).success(function(data) {
        return Ember.run(null, resolve);
      }).error(function() {
        return Ember.run(null, reject);
      });
    });
  }
});

Xvote.GotitButtonComponent = Em.Component.extend({
  tagName: 'button',
  classNames: 'btn btn-lg',
  layout: Ember.Handlebars.compile("{{model.status}}"),
  classNameBindings: 'buttonStatus:btn-success:btn-danger',
  click: function() {
    return this.sendAction('action', this.get('model'));
  }
});

Xvote.VotesBadgeComponent = Em.Component.extend({
  tagName: 'span',
  classNames: 'badge',
  votes: Ember.computed.alias('model.votes'),
  layout: Ember.Handlebars.compile("Votes {{votes}}"),
  classNameBindings: 'actionable:active',
  click: function() {
    if (this.get('actionable')) {
      return this.sendAction('action', this.get('model'));
    }
  }
});

Xvote.GameController = Em.ObjectController.extend({
  needs: 'games',
  hasAvailableAction: Em.computed.alias('controllers.games.hasAvailableAction'),
  isOwned: Ember.computed.equal('status', 'gotit')
});

Xvote.GamesController = Em.ArrayController.extend({
  newGame: '',
  hasAvailableAction: (function() {
    var cookie, day, now;
    now = new Date();
    day = now.getDay();
    if (day === 6 || 0) {
      return false;
    }
    cookie = $.cookie('Xvote-HasAction');
    if (cookie === void 0) {
      return true;
    }
    if (cookie === 'no') {
      return false;
    }
  }).property(),
  useAction: function() {
    Xvote.ActionCookie.create();
    return this.set('hasAvailableAction', false);
  },
  actions: {
    addGame: function() {
      var game, gameName, list, self, uniq;
      gameName = $.trim(this.get('newGame'));
      list = this.mapBy('title');
      uniq = true;
      list.forEach(function(item, index, enumerable) {
        if (item.toUpperCase() === gameName.toUpperCase()) {
          return uniq = false;
        }
      });
      if (uniq === false) {
        alert('Game is already on the list!');
        this.set('newGame', '');
        return;
      }
      if (gameName === '') {
        this.set('newGame', '');
        return;
      }
      game = this.store.createRecord('game', {
        title: gameName,
        votes: 1,
        status: 'wantit'
      });
      this.useAction();
      self = this;
      return game.save().then(function(value) {
        self.send('updateModels');
        return game.deleteRecord();
      });
    }
  }
});

Xvote.GamesIndexController = Em.ArrayController.extend({
  unowned: Em.computed.filterBy('content', 'status', 'wantit'),
  owned: Em.computed.filterBy('content', 'status', 'gotit'),
  arrangedOwned: Em.computed.sort('owned', function(a, b) {
    if (a.get('title') < b.get('title')) {
      return -1;
    } else if (a.get('title') > b.get('title')) {
      return 1;
    }
    return 0;
  }),
  arrangedUnowned: Em.computed.sort('unowned', function(a, b) {
    return b.get('votes') - a.get('votes');
  })
});

Xvote.GamesOwnedController = Em.ArrayController.extend({
  owned: Em.computed.filterBy('content', 'status', 'gotit'),
  arrangedOwned: Em.computed.sort('owned', function(a, b) {
    if (a.get('title') < b.get('title')) {
      return -1;
    } else if (a.get('title') > b.get('title')) {
      return 1;
    }
    return 0;
  })
});

Xvote.GamesUnownedController = Em.ArrayController.extend({
  unowned: Em.computed.filterBy('content', 'status', 'wantit'),
  arrangedUnowned: Em.computed.sort('unowned', function(a, b) {
    return b.get('votes') - a.get('votes');
  })
});

Xvote.Game = DS.Model.extend({
  title: DS.attr('string'),
  votes: DS.attr('number'),
  status: DS.attr('string')
});

Xvote.GamesRoute = Em.Route.extend({
  model: function() {
    return this.store.find('game').then(function(value) {
      return value;
    }, function(rejection) {
      return alert('Connection error: unable to communicate with server.');
    });
  },
  actions: {
    ownGame: function(game) {
      if (game.get('status') === 'gotit') {
        return;
      }
      game.set('status', 'gotit');
      return game.save();
    },
    vote: function(game) {
      game.incrementProperty('votes');
      game.save();
      this.controllerFor('games').set('hasAvailableAction', false);
      return Xvote.ActionCookie.create();
    },
    updateModels: function() {
      return this.refresh();
    }
  }
});

Xvote.GamesIndexRoute = Em.Route.extend({
  model: function() {
    return this.modelFor('games');
  }
});

Xvote.GamesOwnedRoute = Em.Route.extend({
  model: function() {
    return this.store.filter('game', function(game) {
      return game.get('status', 'gotit');
    });
  },
  renderTemplate: function(controller) {
    return this.render('games/index', {
      controller: controller
    });
  }
});

Xvote.GamesUnownedRoute = Em.Route.extend({
  model: function() {
    return this.store.filter('game', function(game) {
      return game.get('status', 'wantit');
    });
  },
  renderTemplate: function(controller) {
    return this.render('games/index', {
      controller: controller
    });
  }
});

Xvote.Store = DS.Store.extend();

Xvote.ActionCookie = {
  create: function() {
    var exp;
    exp = new Date();
    exp.setHours(23, 59, 59);
    return $.cookie('Xvote-HasAction', 'no', {
      expires: exp
    });
  }
};

Xvote.GameView = Em.View.extend({
  classNames: 'col-xs-12 game-view list-group-item',
  tagName: 'li'
});

Xvote.GamesView = Em.View.extend({
  classNames: 'row fluid'
});

Xvote.GamesIndexView = Em.View.extend({
  classNames: 'row fluid'
});
