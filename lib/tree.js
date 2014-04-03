/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(name, path, childs, leaves, depth) {
	return {
		name: name,
		path: path,
		childs: childs,
		leaves: leaves,
		depth: depth
	};
};