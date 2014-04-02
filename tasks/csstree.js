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
        if (name.indexOf('.gen') === -1) {
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

  var generate = function(tree, parent, options) {
    var branchFile = 'branch.gen' + options.extension;

    var content = '';
    if (parent) {
      content += '@import "../' + branchFile + '";\n';
    }

    tree.leaves.forEach(function(leaf) {
      content += '@import "' + leaf + '";\n';
    });

    fs.writeFileSync(tree.path + '/' + branchFile, content, {
      encoding: 'utf-8'
    });

    tree.childs.forEach(function(child) {
      generate(child, tree, options);
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
    generate: function(tree, options) {
      if (!options) {
        options = {
          extension: '.css'
        };
      }

      if (!options.extension) {
        options.extension = '.css';
      }

      generate(tree, null, options);
    }
  };
};