module.exports = 
	compile: 
    files: 
      '<%= config.dist %>/assets/templates.js': ['app/templates/*.emblem', 'app/templates/*/*.emblem']
    options: 
      root: 'app/templates/'
      dependencies: 
        jquery: '<%=config.minJs %>/jquery.min.js'
        ember: '<%=config.minJs %>/ember.min.js'
        emblem: '<%=config.minJs %>/emblem.min.js'
        handlebars: '<%=config.minJs %>/handlebars.min.js'