# <img src="https://raw.githubusercontent.com/salesforce-ux/theo/master/assets/theo.png" alt="Theo logo" width="28" /> gulp-theo

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

Theo is a [gulp](http://gulpjs.com) plugin for
transforming and formatting [Design Tokens](https://npmjs.org/package/theo/#overview)
with [Theo](https://npmjs.org/package/theo).

## Install

```sh
npm install theo gulp-theo --save-dev
```

## Usage

Here is a simple example with one file (`props.yml`)
that gets transformed into its Sass (SCSS) equivalent:

```yml
# design/props.yml
global:
  category: 'web'
  type: 'color'
props:
  foo:
    value: '#ff0000'
  baz:
    value: '#0000ff'
```

```js
// gulpfile.js
const gulp = require('gulp')
const theo = require('gulp-theo')

// Transform design/props.yml to dist/props.scss:
gulp.task('tokens:scss', () =>
  gulp.src('design/props.yml')
    .pipe(theo({
      transform: { type: 'web' },
      format: { type: 'scss' }
    }))
    .pipe(gulp.dest('dist'))
)
```

Running `gulp run tokens:scss` outputs:

```scss
// dist/props.scss
$foo: rgb(255, 0, 0);
$baz: rgb(0, 0, 255);
```

## Advanced Usage

In this example (available in the [/example](https://github.com/salesforce-ux/gulp-theo/tree/master/example) folder), gulp-theo generates multiple files, transformed using a custom format (`array.js`).

```yml
# tokens/_aliases.yml
aliases:
  red: 'rgb(255, 0, 0)'
  blue: 'rgb(0, 0, 255)'
```

```yml
# tokens/_colors.yml
global:
  category: 'web'
  type: 'color'
imports:
  - _aliases.yml
props:
  brand:
    value: '{!blue}'
    comment: 'ACME Inc. brand color.'
  primary:
    value: '{!red}'
    comment: 'Use the primary color on call-to-action buttons. e.g. "Save", "Log In"…'
```

```yml
# tokens/_mobile-overrides.yml
global:
  category: 'web'
  type: 'mobile'
props:
  large:
    value: '3rem'
```

```yml
# tokens/_sizes.yml
global:
  category: 'web'
  type: 'size'
imports:
  - _aliases.yml
props:
  medium:
    value: '1rem'
  large:
    value: '2rem'
```

```yml
# tokens/default.yml
imports:
  - _colors.yml
  - _sizes.yml
```

```yml
# tokens/mobile.yml
imports:
  - _colors.yml
  - _sizes.yml
  - _mobile-overrides.yml
```

```js
// gulpfile.js
const gulp = require('gulp')
const gulpTheo = require('gulp-theo')
const theo = require('theo')

theo.registerFormat('array.js', `
  // Source: {{stem meta.file}}
  module.exports = [
    {{#each props as |prop|}}
      {{#if prop.comment}}// {{{prop.comment}}}{{/if}}
      ['{{camelcase prop.name}}', '{{prop.value}}'],
    {{/each}}
  ]
`)

gulp.task('tokens:array', () =>
  gulp.src([
    // Look for yml files
    'tokens/*.yml',
    // Exclude partials (files prefixed with _)
    '!tokens/_*'
  ])
  .pipe(gulpTheo(
    {
      transform: {
        type: 'web'
      },
      format: {
        type: 'array.js'
      }
    }
  ))
  .pipe(gulp.dest('dist'))
)

```

Running `gulp tokens:array` will output:

```js
// dist/default.array.js

// Source: default
module.exports = [
  // ACME Inc. brand color.
  ['brand', 'rgb(0, 0, 255)'],
  // Use the primary color on call-to-action buttons. e.g. "Save", "Log In"…
  ['primary', 'rgb(255, 0, 0)'],
  ['medium', '1rem'],  
  ['large', '2rem'],
]
```

```js
// dist/mobile.array.js

// Source: mobile
module.exports = [
  // ACME Inc. brand color.
  ['brand', 'rgb(0, 0, 255)'],
  // Use the primary color on call-to-action buttons. e.g. "Save", "Log In"…
  ['primary', 'rgb(255, 0, 0)'],
  ['medium', '1rem'],  
  ['large', '3rem'],
]
```

----

Another example is available at <https://github.com/salesforce-ux/theo-example>.

For any other options, refer to [Theo’s documentation](https://travis-ci.org/salesforce-ux/gulp-theo).

[npm-url]: https://npmjs.org/package/gulp-theo
[npm-image]: http://img.shields.io/npm/v/gulp-theo.svg

[travis-url]: https://travis-ci.org/salesforce-ux/gulp-theo
[travis-image]: http://img.shields.io/travis/salesforce-ux/gulp-theo.svg
