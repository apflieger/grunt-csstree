/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';

var csstree = require('../lib/csstree')();

module.exports = function(grunt) {
	grunt.registerMultiTask('csstree', 'Css files dependecies management.', function() {
		var treeRoot = this.data.src;
		grunt.log.write('Building tree ' + treeRoot + '...');

		var tree = csstree.model(treeRoot);

		csstree.generate(tree, this.options());
		grunt.log.ok();
	});

};