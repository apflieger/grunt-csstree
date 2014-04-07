# grunt-csstree

> Manage dependencies between your CSS files.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

To install the module:
```shell
npm install grunt-csstree --save-dev
```

Include the task in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-csstree');
```

## Informations

Csstree allows you to fragment and mutualise your CSS, manage the inclusions of them but without writing any `@import`. It doesn't add anything to the syntax, it's fully compliant
 and compatible with all different tools around CSS.

Basically, Csstree writes `@import` for you, based on the files/directories structure of your project. Because of the use of `@import` rules, Csstree should always be combined with some kind of minification in order to not slow down page load.

### How it works

Csstree generates a file `branch.gen.css` in every directory contained in a given root. Each file will have `@import` declarations of

1. ../branch.gen.css
2. All files within this directory, but not subdirectories

The structure is recursive! Inclusions are going upward.

Take a moment to think of it ;)

### Example

```
index.html
css
+-- index
|   +-- index.css
+-- articles
|   +-- templates.css
|   +-- edit
|       +-- edit.css
+-- menus.css
+-- reset.css
```
By adding `<link rel="stylesheet" href="css/index/branch.gen.css">` to index.html, you will import `menus.css`, `reset.css` and `index.css`.

You get it, `css/acticles/branch.gen.css` would import `menus.css`, `reset.css` and `templates.css` but not `edit.css`.

`css/acticles/edit/branch.gen.css` would import `menus.css`, `reset.css`, `templates.css` and `edit.css`.

> This is a very convenient way to organise CSS. Note that the order of imports matters, CSS overriding becomes much more clear because only subdirectories can override.

## Usage

### Basic setup using [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)

As mentionned above, using `branch.gen.css` directly is practial for developing but should be replaced in production. We are going to minify our `branch.gen.css` into `branch.gen.min.css`. We let you figure out how to do the switch because it depends a lot on how you manage deployment, configurations etc ... 

```js
grunt.initConfig({
  csstree: {
    clientProject: {
      src: 'css/' // The root of your css tree
    }
  },
  cssmin: {
    minifyBranches: {
      expand: true,
      src: ['css/**/branch.gen.css'],
      dest: 'css/',
      ext: '.min.css',
      extDot: 'last'
    }
  }
});
```
`src` must be a single directory.
Csstree is a [multi-task](http://gruntjs.com/configuring-tasks#task-configuration-and-targets), so if you want to build several trees, then define several targets.

> Csstree excludes file names that contain `.gen`, so please keep `.gen` on minified files so they won't be processed by further Csstree executions.

Generated files should not be commited and should be included in a [clean](https://github.com/gruntjs/grunt-contrib-clean) task:

```js
clean: ['css/**/*.gen.*']
```

### Coupling with [Less](https://github.com/gruntjs/grunt-contrib-less)

Given that your less (or css) files are in styles/

[Less](http://lesscss.org/) doesn't resolve @import on regular css files (more details [here](http://lesscss.org/features/#import-directives-feature)), we revolve this simply by changing the extension of branch files:

```js
grunt.initConfig({
  csstree: {
    lessTree: {
      options: {
        ext: '.less'
      },
      src: 'styles'
    }
  },
  less: {
    compileTree: {
      expand: true,
      src: ['styles/**/branch.gen.less'],
      ext: '.min.css',
      extDot: 'last'
    }
  }
});
```
## Options

### ext
Type: `String`  
Default: `.css`  

Extension of generated files branch.gen(+ext)

### importFormat

Type: `Function(file)`  
Default: `return '@import "' + filename +'";'`  

Define the import format used in `branch.gen.css`. Csstree redefine it itself when using `ext: '.less'`

### encoding
Type: `String`  
Default: `utf-8`  

Encoding of generated files

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. We care about clean git history as well.

## Release History
* 2014-04-07 v0.1.0 First version of Csstree
