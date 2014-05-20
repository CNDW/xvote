module.exports = {
  src: '<%= config.dist %>/assets/app.js',
  options: {
    specs: ['specs/*/*.js', 'specs/*Spec.js'],
    vendor: ['<%= config.dist %>/assets/jquery.js', '<%= config.dist %>/assets/jquery-cookie.js', '<%= config.dist %>/assets/handlebars.js', '<%= config.dist %>/assets/ember.js', '<%= config.dist %>/assets/ember-data.js', '<%= config.dist %>/assets/templates.js']
  }
};
