module.exports =
  options:
    banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
  dist: 
    files:
      '<%= config.minJs %>/jquery-cookie.min.js': [
        '<%= config.srcJs %>/jquery-cookie.js'
      ]