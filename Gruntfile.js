/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    csstree: {
      build: 'samples/singlefile'
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'csstree']);

};
