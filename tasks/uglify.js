module.exports = {
  options: {
    banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
  },
  dist: {
    files: {
      '<%= config.dist %>/assets/lib.min.js': ['<%= config.srcJs %>/*.js']
    }
  }
};
