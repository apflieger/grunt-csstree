/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';

var Csstree = require('./csstree');

module.exports = function(grunt) {

	grunt.registerMultiTask('csstree', 'Css files dependecies management.', function() {
		var options = this.options();

		var treeRoot = options.root;
		grunt.log.writeln('Building tree ' + treeRoot + '...');

		var csstree = new Csstree();
		var tree = csstree.build(treeRoot);

		csstree.generate(tree);
	});

};