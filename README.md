X-Vote
=====

##Xbox game voting app

A demo app for adding games to a list, voting on them, and marking them as owned.

Built in Ember 1.5.1 with Ember-Data 1.0.0beta.7 and Bootstrap 3

###Build tools

1. Grunt
2. CoffeeScript
3. Emblem.js
4. Bower
5. Sass

###App Features

1. Single Page Architecture
  1. Mobile Responsive
  2. Deep linking enabled
  3. Browser History compatible
  4. Javascript templates for dynamically rendered html
2. Api compatible
  1. Built in custom adapter for a JSONP RPC api
  2. Structured to enable plug and play swap of adapters to fit any api
  3. Data Cache built in with Ember Data to minimize api calls and speed up loading
3. Ability to add new titles
  1. New titles are run through a validation to ensure only unique names can be added
  2. Utilizes browser cookies to set restrictions on when and how often new titles can be added
4. Ability to mark titles as owned
  1. Dynamically sorted listing sorts unowned titles by vote count and owned titles by title name
  2. Filtered view options allow for viewing all titles, only owned, or only unowned.
5. Ability to vote on unowned titles
  1. Utilizes browser cookies to set restrictions on when and how often titles can be voted on.


###Directory Structure

####App structure
The app is written in coffeescript and located in the /app directory.
Directory file structure follows standard Ember.js conventions.
