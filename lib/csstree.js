/*
 * csstree
 * https://github.com/apflieger/csstree
 *
 * Copyright (c) 2014 Arnaud Pflieger
 * Licensed under the MIT license.
 */

'use strict';

var Tree = require('./tree');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

module.exports = function() {

  var buildTree = function(dir) {
    var filenames = fs.readdirSync(dir);

    // Separating directories and files under dir
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

    // Building the childs of this tree recursively
    coll.childs.forEach(function(child) {
      childs.push(buildTree(child));
    });

    return new Tree(path.basename(dir), dir, childs, coll.leaves);
  };

  var generate = function(tree, parent, options) {
    // Name of the generated css files that will contain @import rules
    var branchFile = 'branch.gen' + options.ext;

    var content = '';

    // Imports all the css of the parent if it's not the root directory of the tree
    if (parent) {
      content += options.importFormat('../' + branchFile) + '\n';
    }

    // Imports all the files included in this directory
    tree.leaves.forEach(function(leaf) {
      content += options.importFormat(leaf) + '\n';
    });

    fs.writeFileSync(tree.path + '/' + branchFile, content, {
      encoding: options.encoding
    });

    // Generation called recursively on the subdirectories
    tree.childs.forEach(function(child) {
      generate(child, tree, options);
    });
  };

  return {
    // Crawl the given directory and build the tree object model for further use    
    model: function(treeRoot) {
      var stat = fs.statSync(treeRoot);
      if (stat.isDirectory()) {
        return buildTree(treeRoot);
      } else {
        throw new Error("path: " + treeRoot + " is not a directory");
      }
    },
    // returns a filtered tree using accept(file) on every leaves.
    filter: function filter(tree, accept) {
      if (!accept) {
        return tree;
      }
      return new Tree(tree.name, tree.path, _.map(tree.childs, function(child) {
        return filter(child, accept);
      }), _.filter(tree.leaves, accept));
    },
    // Generate the files that contains @import rules on the given tree
    generate: function(tree, options) {
      if (!options) {
        options = {
          ext: '.css',
          importFormat: null, // to be initialized just bellow
          encoding: 'utf-8',
        };
      }

      if (!options.ext) {
        options.ext = '.css';
      }

      if (!options.importFormat) {
        if (options.ext === '.css') {
          options.importFormat = function(path) {
            return '@import "' + path + '";';
          };
        } else if (options.ext === '.less') {
          options.importFormat = function(path) {
            return '@import (less) "' + path + '";';
          };
        }
      }

      if (!options.encoding) {
        options.encoding = 'utf-8';
      }

      generate(tree, null, options);
    }
  };
};