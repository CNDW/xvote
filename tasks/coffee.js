var options;

options = {
  bare: true
};

module.exports = {
  compileApp: {
    options: options,
    files: {
      'dist/assets/app.js': ['app/*.coffee', 'app/*/*.coffee']
    }
  },
  compileTasks: {
    options: options,
    expand: true,
    flatten: true,
    cwd: 'tasks/src',
    src: ['*.coffee'],
    dest: 'tasks',
    ext: '.js'
  },
  compileGruntfile: {
    options: options,
    files: {
      'Gruntfile.js': 'src/Gruntfile.coffee'
    }
  },
  compileSpecs: {
    options: options,
    expand: true,
    flatten: true,
    cwd: 'specs/src',
    src: ['*Spec.coffee'],
    dest: 'specs',
    ext: '.js'
  }
};
