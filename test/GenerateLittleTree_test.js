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
var fs = require('fs');
var csslint = require('csslint').CSSLint;

exports.testRootNotDirectory = function(test) {
	test.expect(4);

	var readFile = function(path) {
		var content = fs.readFileSync(path, {
			encoding: 'utf-8'
		});

		var result = csslint.verify(content, {
			import: false
		});

		if (result.messages.length) {
			throw new Error('csslint error on ' + path + ', run grunt csslint for more informations');
		}

		return content;
	};

	// crawling and generating littleTree
	var csstree = new Csstree();
	var tree = csstree.build('./test/littleTree');
	csstree.generate(tree);

	// testing the root of the tree
	var contentRoot = readFile('./test/littleTree/branch.gen.css');

	test.ok(contentRoot.indexOf('@import "../branch.gen.css";') === -1);
	test.ok(contentRoot.indexOf('@import "base.css";') > -1);

	// testing the faq branch
	var contentFaq = readFile('./test/littleTree/faq/branch.gen.css');

	test.ok(contentFaq.indexOf('@import "../branch.gen.css";') > -1);
	test.ok(contentFaq.indexOf('@import "faq.css";') > -1);

	test.done();
};