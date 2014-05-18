module.exports = 
  dist:
   files:[
     expand: true
     cwd: '<%= config.vendor %>/bootstrap-sass-official/vendor/assets/stylesheets'
     src: ['*', '*/*', '*/*/*']
     dest: '<%= config.scss %>/vendor'
    ,
     expand: true
     cwd: '<%= config.vendor %>/ember'
     src: 'ember.min.js'
     dest: '<%= config.minJs %>'
    ,
     expand: true
     cwd: '<%= config.vendor %>/ember-data'
     src: 'ember-data.min.js'
     dest: '<%= config.minJs %>'
    ,
     expand: true
     cwd: '<%= config.vendor %>/handlebars'
     src: 'handlebars.min.js'
     dest: '<%= config.minJs %>'
    ,
     expand: true
     cwd: '<%= config.vendor %>/emblem.js'
     src: 'emblem.min.js'
     dest: '<%= config.minJs %>'
    ,
     expand: true
     cwd: '<%= config.vendor %>/jquery/dist'
     src: 'jquery.min.map'
     dest: '<%= config.dist %>/assets'
    ,
     expand: true
     cwd: '<%= config.vendor %>/jquery/dist'
     src: 'jquery.min.js'
     dest: '<%= config.minJs %>'
   ]