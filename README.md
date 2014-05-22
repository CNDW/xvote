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
The app utilizes a common.js module pattern by extending Ember.js primitives into new objects that follow Ember.js naming conventions.
Utilizing Grunt Watch will cause any changes to .coffee files or .emblem files to trigger grunt tasks that will compiile and concatenate the app into app.js and templates.js, and place them in the dist/assets directory

The dist/ directory contains the index.html and the dist/assets directory for the development distribution of the app. All of the tasks assigned to grunt watch place the task produced files into this directory for a localhost webserver to distribute.

The public/ directory contains the working public release of the App, any files pushed to a production environment should come from this directory. 
public/assets contains minified versions of app.js, templates.js, app.css, and lib-min.js for production use.
public/assets/lib-min.js is a minified and concatenated copy of the app's required javascripts. The file is produced by running
    $grunt concat

specs/ contains the jasmine.js testing files with specs/lib housing the jasmine dependencies, and spec/src containing coffeescript versions of the *spec.js files.
Any changes made to files in spec/src will trigger a coffeescript compile task through grunt watch and place the compiled file in the specs/ directory, as well as trigger the jasmine task to run the tests.

src/ contains several files related to the dependencies of the app.
Any bower libraries are placed in src/_lib/ when $bower install is run. 
$grunt copy will copy the .min.js files needed for the $grunt concat task to use when compiling the public/ directory assets.
These tasks are intended to mimic the functionality of the rails asset pipeline in an effort to streamline the dependency download and update processes.
The Gruntfile.coffee file is also housed here, and any changes will trigger a compile from grunt watch to Gruntfile.js in the root directory.

styles/ contains the .scss assets for development. Grunt watch will compile them into the app.css file and place it in the dist/assets directory. Again this is intended to mimic the rails asset pipeline to help streamline and simplify the use of preprocessed langages in development.
styles/vendor contains any css framework files downloaded by bower and copied by the $grunt copy command.

Finally the tasks/ and tasks/src folders contain config files in node module format in an effort to simplify the already complex gruntfile.js.
tasks/src contains coffeescript versions that are observed by grunt watch and auto-compiled on changes
