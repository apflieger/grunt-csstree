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
var less = require('less');

exports.testRootNotDirectory = function(test) {
	var readFile = function(path) {
		return fs.readFileSync('./test/lessTree/' + path, {
			encoding: 'utf-8'
		});
	};
	console.log();


	// crawling and generating littleTree
	var csstree = new Csstree();
	csstree.generate(csstree.build('./test/lessTree'), {
		extension: '.less'
	});

	var content = readFile('uglyPage/branch.gen.less');

	var parser = new(less.Parser)({
		paths: ['./test/lessTree/uglyPage'] // Specify search paths for @import directives
	});

	test.expect(3);
	parser.parse(content, function(e, lexicalTree) {
		if (e) {
			console.log(e);
			return;
		}
		var css = lexicalTree.toCSS();
		test.ok(css.indexOf('@import') === -1);
		test.ok(css.indexOf('background: white;') > -1);
		test.ok(css.indexOf('color: black;') > -1);
		test.done();
	});


};