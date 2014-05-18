module.exports = {
  options: {
    stripBanners: true,
    banner: '/*! <%= pkg.name %> - v<%=pkg.version%> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
  },
  distLib: {
    dest: '<%= config.dist %>/assets/lib-min.js',
    src: ['<%=config.minJs %>/jquery.min.js', '<%=config.minJs %>/handlebars.min.js', '<%=config.minJs %>/ember.min.js', '<%=config.minJs %>/ember-data.min.js']
  }
};
