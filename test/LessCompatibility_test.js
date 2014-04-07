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
var fs = require('fs');
var less = require('less');

exports.testRootNotDirectory = function(test) {

	var readFile = function(path) {
		return fs.readFileSync('./test/lessTree/' + path, {
			encoding: 'utf-8'
		});
	};

	// Generating the tree, with the use of the .less extension, which will allow the less
	// parser to process those files.
	csstree.generate(csstree.model('./test/lessTree'), {
		ext: '.less'
	});

	var content = readFile('uglyPage/branch.gen.less');

	var parser = new(less.Parser)({
		// We will give the text content of the file 'uglyPage/branch.gen.less'.
		// As lessc will compile a string and not a file, it has no way to resolve @import rules
		// Luckily, this option allow us to tell lessc how to resolve imports
		paths: ['./test/lessTree/uglyPage'] // Specify search paths for @import directives
	});

	test.expect(3);
	parser.parse(content, function(e, lexicalTree) {
		if (e) {
			console.log(e);
			return;
		}
		var css = lexicalTree.toCSS();
		// The result shouldn't contain @import anymore
		test.ok(css.indexOf('@import') === -1);
		test.ok(css.indexOf('background: white;') > -1);
		test.ok(css.indexOf('color: black;') > -1);
		test.done();
	});
};