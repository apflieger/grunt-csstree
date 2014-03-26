/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';

var S = require('string');

module.exports = function(name, childs, leaves, depth) {
	return {
		depth: function() {
			return depth;
		}
	};
};