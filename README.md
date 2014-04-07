# grunt-csstree

> Manage dependencies between your CSS files.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide.

To install the module:
```shell
npm install csstree --save-dev
```

Include the task in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-csstree');
```

## Informations

Csstree allows you to fragment and mutualise your css, manage the inclusions of them but without writing any `@import`.

Basically, Csstree writes `@import` for you, based on the files/directories structure of your project. Because of the use of `@import` rules, Csstree should always be combined with some kind of minification in order to not slow down page load.

### How it works

Csstree generates a file `branch.gen.css` in every directory, starting from a given root. This file will `@import` :

1. ../branch.gen.css, all that the parent directory includes.
2. All files within this directory, but not subdirectories

### Example

```
index.html
css
+-- index
|   +-- index.css
+-- articles
|   +-- template.css
|   +-- edit
|       +-- edit.css
+-- menus.css
+-- reset.css
```
By adding `<link rel="stylesheet" href="css/index/branch.gen.css">` to index.html, you will import menus.css, reset.css and index.css.

css/acticles/branch.gen.css would import menus.css, reset.css and templates.css but not edit.css

> This is a very convenient way to organise css. Note that the order of imports matters, css overriding becomes much more clear because only subdirectories can override.

## Usage

### Basic setup using [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)

As mentionned above, using `branch.gen.css` directly is practial for developing but should be replaced in production. we are going to minify our `branch.gen.css` into `branch.gen.min.css`. We let you figure out how to do the switch because it depends a lot on how you manage deployment, configurations etc ... 

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
Csstree is a [multi-task](http://gruntjs.com/configuring-tasks#task-configuration-and-targets), so if you want to build several trees, then define several targets !

> Csstree excludes file names that contain `.gen`, so please keep `.gen` on minified files so they won't be processed by further Csstree executions.

Generated files should not be commited and should be included in a [clean](https://github.com/gruntjs/grunt-contrib-clean) task:

```js
clean: ['css/**/*.gen.*']
```

### Coupling with Less

Given that your less (or css) files are in styles/

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

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## Release History
_(Nothing yet)_
