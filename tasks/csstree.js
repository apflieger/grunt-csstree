/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('csstree', 'Css files dependecies management.', function() {
    grunt.log.writeln('target : ' + this.target);
    grunt.log.writeln('data : ' + this.data);

    grunt.log.writeln('files : ');
 
    var treeRoot = this.data;
    grunt.file.recurse(treeRoot, function(filename){
      grunt.log.writeln('\t' + filename);
    });
  });

};
