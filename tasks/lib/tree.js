/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';

var S = require('string');

module.exports = function(root){
	return {
		depth: function(dir){
			return dir ? S(dir).count('/') : 0;
		}
	}
}