// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

const gulp = require('gulp')
const theo = require('gulp-theo')

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
  .pipe(theo.plugin(
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
