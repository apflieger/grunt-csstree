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
      'tasks/**/*.js',
      'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    nodeunit: {
      all: ['test/**/*_test.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['jshint', 'nodeunit']);

};
