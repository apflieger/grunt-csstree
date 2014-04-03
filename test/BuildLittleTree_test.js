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

var Csstree = require('../tasks/lib/csstree');

exports.testRootNotDirectory = function(test) {
	var csstree = new Csstree();

	test.throws(function() {
		csstree.build('./Gruntfile.js');
	});
	test.done();
};

exports.testLittleTree = function(test) {
	var csstree = new Csstree();

	var tree = csstree.build('./test/littleTree');

	test.equal(tree.depth, 0);
	test.equal(tree.name, 'littleTree');
	test.equal(tree.leaves[0], 'base.css');
	test.equal(tree.childs.length, 2);

	var faq = tree.childs[0];
	test.equal(faq.name, 'faq');
	test.equal(faq.depth, 1);
	test.equal(faq.childs.length, 0);
	test.equal(faq.leaves.length, 1);
	test.equal(faq.leaves[0], 'faq.css');

	var home = tree.childs[1];
	test.equal(home.name, 'home');
	test.equal(home.depth, 1);
	test.equal(home.childs.length, 0);
	test.equal(home.leaves.length, 2);
	test.equal(home.leaves[0], 'home.css');
	test.equal(home.leaves[1], 'menu.css');
	test.done();
};