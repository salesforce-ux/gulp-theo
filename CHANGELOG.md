# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [2.0.0]

### ⚠️ Breaking changes

* `theo` is now a `peerDependency`
* `gulp-theo` now just exports a function instead of an object with a `plugin` property

### Migration guide

```sh
npm install theo gulp-theo --save-dev
```

```js
const gulp = require('gulp');
const theo = require('gulp-theo');

gulp
  .src('design/props.yml')
  .pipe(
    theo({
      transform: { type: 'web' },
      format: { type: 'scss' }
    })
  )
  .pipe(gulp.dest('dist'));
```

## 1.0.0

* Initial release.

[2.0.0]: https://github.com/salesforce-ux/gulp-theo/compare/v1.0.0...2.0.0
