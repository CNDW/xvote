module.exports =
  src: '<%= config.dist %>/assets/app.js'
  options:
    specs: 'specs/*Spec.js'
    vendor: ['<%= config.dist %>/assets/lib-min.js', '<%= config.dist %>/assets/templates.js']