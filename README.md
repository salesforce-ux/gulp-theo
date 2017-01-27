# gulp-theo

```js
const gulp = require('gulp')
const theo = require('gulp-theo')

// Transform design/props.json to dist/props.scss:
gulp.src('design/props.json')
  .pipe(theo.plugin({
    transform: { type: 'web' },
    format: { type: 'scss' }
  }))
  .pipe(gulp.dest('dist'))
```
