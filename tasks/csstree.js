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
var fs = require("fs");
var path = require('path');

module.exports = function(treeRoot) {

  var buildTree = function(dir, depth) {
    var filenames = fs.readdirSync(dir);

    var coll = filenames.reduce(function(acc, name) {
      var abspath = path.join(dir, name);

      if (fs.statSync(abspath).isDirectory()) {
        acc.childs.push(abspath);
      } else {
        acc.leaves.push(name);
      }

      return acc;
    }, {
      childs: [],
      leaves: []
    });

    var childs = [];

    coll.childs.forEach(function(child) {
      childs.push(buildTree(child, depth + 1));
    });

    return new Tree(path.basename(dir), childs, coll.leaves, depth);
  };

  return {
    build: function() {
      var stat = fs.statSync(treeRoot);
      if (stat.isDirectory()) {
        return buildTree(treeRoot, 0);
      } else {
        throw new Error("path: " + treeRoot + " is not a directory");
      }
    }
  };
};