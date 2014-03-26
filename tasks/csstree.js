/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';
var Tree = require('./lib/Tree');
var file = require("file");

module.exports = function(treeRoot) {
  var absTreeRoot = file.path.abspath(treeRoot);
  console.log(absTreeRoot);

  file.walkSync(absTreeRoot, function(dir, dirs, files) {
    console.log(dir);
    console.log(dirs);
    console.log(files);
  });

  console.log('fin');
};