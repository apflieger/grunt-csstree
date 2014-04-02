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
var fs = require('fs');

exports.testRootNotDirectory = function(test) {
	var readFile = function(path) {
		return fs.readFileSync('./test/littleTree/' + path, {
			encoding: 'utf-8'
		});
	};

	// crawling and generating littleTree
	var csstree = new Csstree();
	var tree = csstree.build('./test/littleTree');
	csstree.generate(tree);

	// testing the root of the tree
	var contentRoot = readFile('branch.gen.css');

	test.ok(contentRoot.indexOf('@import "../branch.gen.css";') === -1);
	test.ok(contentRoot.indexOf('@import "base.css";') > -1);

	// testing the faq branch
	var contentFaq = readFile('faq/branch.gen.css');

	test.ok(contentFaq.indexOf('@import "../branch.gen.css";') > -1);
	test.ok(contentFaq.indexOf('@import "faq.css";') > -1);
	
	test.done();
};