/* Test methods:
	test.expect(numAssertions)
	test.done()
	Test assertions:
	test.ok(value, [message])
	test.equal(actual, expected, [message])
	test.notEqual(actual, expected, [message])
	test.deepEqual(actual, expected, [message])
	test.notDeepEqual(actual, expected, [message])
	test.strictEqual(actual, expected, [message])
	test.notStrictEqual(actual, expected, [message])
	test.throws(block, [error], [message])
	test.doesNotThrow(block, [error], [message])
	test.ifError(value)
*/
'use strict';

var csstree = require('../lib/csstree')();
var Tree = require('../lib/Tree');
var minimatch = require('minimatch');

exports.filter_null = function(test) {
	var tree = new Tree('test', 'test', [], ['leaf1.css', 'leaf2.css']);
	var filteredTree = csstree.filter(tree);
	test.equal(filteredTree, tree);
	test.done();
};

exports.filter_true = function(test) {
	var tree = new Tree('test', 'test', [], ['leaf1.css', 'leaf2.css']);
	var filteredTree = csstree.filter(tree, function(leaf) {
		return true;
	});
	test.deepEqual(filteredTree, tree);
	test.done();
};

exports.filter_png = function(test) {
	var tree = new Tree('test', 'test', [], ['leaf1.css', 'leaf2.png']);
	var filteredTree = csstree.filter(tree, function(leaf) {
		return minimatch(leaf, '*.css');
	});
	test.deepEqual(filteredTree.leaves, ['leaf1.css']);
	test.done();
};

exports.filter_recursive = function(test) {
	var subtree = new Tree('child', 'child', [], ['leaf1.css', 'leaf2.png']);
	var tree = new Tree('root', 'root', [subtree], ['leaf1.css', 'leaf2.png'	]);
	var filteredTree = csstree.filter(tree, function(leaf) {
		return minimatch(leaf, '*.css');
	});
	test.deepEqual(filteredTree.leaves, ['leaf1.css']);
	test.deepEqual(filteredTree.childs[0].leaves, ['leaf1.css']);
	test.done();
};