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
    clean: ['test/**/*.gen.*'],

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
    },

    csslint: {
      options: {
        import: false
      },
      src: ['test/**/*.css']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.registerTask('default', ['clean', 'jshint', 'nodeunit']);

};