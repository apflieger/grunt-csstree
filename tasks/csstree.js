/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';
var Tree = require('./lib/Tree');
var fs = require("fs");
var path = require('path');

module.exports = function() {

  var buildTree = function(dir, depth) {
    var filenames = fs.readdirSync(dir);

    var coll = filenames.reduce(function(acc, name) {
      var abspath = path.join(dir, name);

      if (fs.statSync(abspath).isDirectory()) {
        acc.childs.push(abspath);
      } else {
        if (name !== 'branch.css') {
          acc.leaves.push(name);
        }
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

    return new Tree(path.basename(dir), dir, childs, coll.leaves, depth);
  };

  var generate = function(tree, parent) {
    var content = '';
    if (parent) {
      content += '@import "../branch.css";\n';
    }

    tree.leaves.forEach(function(leaf) {
      content += '@import "' + leaf + '";\n';
    });

    fs.writeFileSync(tree.path + '/branch.css', content, {
      encoding: 'utf-8'
    });

    tree.childs.forEach(function(child) {
      generate(child, tree);
    });
  };

  return {
    build: function(treeRoot) {
      var stat = fs.statSync(treeRoot);
      if (stat.isDirectory()) {
        return buildTree(treeRoot, 0);
      } else {
        throw new Error("path: " + treeRoot + " is not a directory");
      }
    },
    generate: function(tree) {
      generate(tree, null);
    }
  };
};