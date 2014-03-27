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

var Csstree = require('../tasks/Csstree');

exports.testLittleTree = function(test) {
	var csstree = new Csstree('./test/littleTree');

	var tree = csstree.build();

	test.equal(tree.depth, 0);
	test.equal(tree.name, 'littleTree');
	test.equal(tree.leaves[0], 'base.css');
	test.equal(tree.childs.length, 1);

	var home = tree.childs[0];
	test.equal(home.name, 'home');
	test.equal(home.depth, 1);
	test.equal(home.childs.length, 0);
	test.equal(home.leaves[0], 'home.css');
	test.done();
};