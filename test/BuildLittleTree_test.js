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

var Tree = require('../tasks/lib/Tree');

exports.testDepth_root = function(test){
	var littleTree = new Tree('littleTree');
	test.equal(littleTree.depth(''), 0);
	test.equal(littleTree.depth(), 0);
	test.done();
};

exports.testDepth_1 = function(test){
	var littleTree = new Tree('littleTree');
	test.equal(littleTree.depth('home'), 1);
	test.done();
};
