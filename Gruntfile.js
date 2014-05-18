var config, taskConfig;

taskConfig = function(name) {
  return require('./tasks/' + name + '.js');
};

config = {
  pkg: require('./package.json'),
  app: 'app',
  dist: 'dist',
  src: 'src',
  scss: 'styles',
  srcCss: 'src/styles',
  srcJs: 'src/js',
  minJs: 'src/js/min',
  vendor: 'src/_lib'
};

module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),
    coffee: taskConfig('coffee'),
    sass: taskConfig('sass'),
    jshint: taskConfig('jshint'),
    concat: taskConfig('concat'),
    copy: taskConfig('copy'),
    emblem: taskConfig('emblem'),
    uglify: taskConfig('uglify'),
    jasmine: taskConfig('jasmine'),
    watch: taskConfig('watch')
  });
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-emblem');
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['copy', 'coffee', 'concat', 'sass']);
};
