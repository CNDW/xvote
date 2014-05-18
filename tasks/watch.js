module.exports = {
  css: {
    files: ['styles/*.scss'],
    tasks: ['sass']
  },
  js: {
    files: ['<%= config.dist %>/assets/app.js', 'specs/*Spec.js'],
    tasks: ['jshint', 'jasmine']
  },
  coffeeGrunt: {
    files: ['src/Gruntfile.coffee'],
    tasks: ['coffee:compileGruntfile']
  },
  coffeeApp: {
    files: ['app/*.coffee', 'app/*/*.coffee'],
    tasks: ['coffee:compileApp']
  },
  coffeeTasks: {
    files: ['tasks/src/*.coffee'],
    tasks: ['coffee:compileTasks']
  },
  coffeeSpecs: {
    files: ['specs/src/*Spec.coffee'],
    tasks: ['coffee:compileSpecs']
  },
  emblem: {
    files: ['app/templates/*.emblem', 'app/templates/*/*.emblem'],
    tasks: ['emblem']
  }
};
