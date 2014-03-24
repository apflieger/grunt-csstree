/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

 'use strict';

 module.exports = function(grunt) {

  var Tree = require('./lib/tree');

  grunt.registerMultiTask('csstree', 'Css files dependecies management.', function() {
    var options = this.options();

    var treeRoot = options.root;
    grunt.log.writeln('Building tree ' + treeRoot + '...');

    var tree = new Tree(treeRoot);

    grunt.log.writeln('files : ');
    grunt.file.recurse(treeRoot, function(abspath, rootdir, subdir, filename){
      grunt.log.writeln('\t' + filename + '\t' + subdir + '\t' + tree.depth(subdir));
    });
  });

};
