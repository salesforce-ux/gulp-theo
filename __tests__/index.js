// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

const gulp = require('gulp');
const through = require('through2');
const theo = require('theo')

const gulpTheo = require('../');

describe('gulp-theo', () => {
  it('transforms Design Tokens as Sass', done => {
    gulp
      .src('__fixtures__/a.json')
      .pipe(
        gulpTheo({
          transform: {
            type: 'web'
          },
          format: {
            type: 'scss'
          }
        })
      )
      .pipe(
        through.obj((file, enc, next) => {
          expect(file.contents.toString('utf8')).toMatchSnapshot();
          next();
          done();
        })
      );
  });
  it('transforms multiple files as Sass', done => {
    gulp
      .src(['__fixtures__/a.json', '__fixtures__/props.yml'])
      .pipe(
        gulpTheo({
          transform: {
            type: 'web'
          },
          format: {
            type: 'scss'
          }
        })
      )
      .pipe(
        through.obj((file, enc, next) => {
          if (file.relative === 'a.json') {
            expect(file.contents.toString('utf8')).toMatchSnapshot();
          }
          if (file.relative === 'props.scss') {
            expect(file.contents.toString('utf8')).toMatchSnapshot();
            done();
          }
          next();
        })
      );
  });
  it('throws an error if a bad configuration is passed', done => {
    gulp
      .src('__fixtures__/a.json')
      .pipe(
        gulpTheo({
          transform: {
            type: undefined
          },
          format: {
            type: 'scss'
          }
        })
      )
      .on('error', e => {
        expect(e.message).toBe('Transform "undefined" is not registered');
        done();
      });
  });
  it('transforms Design Tokens as 1337v4r5', done => {
    theo.registerFormat(
      '1337v4r5',
      `
      😀{{stem meta.file}}-1337:
        {{#each props as |prop|}}
          '{{kebabcase prop.name}}': 😇({{prop.value}})
        {{/each}}
    `
    );
    gulp
      .src('__fixtures__/a.json')
      .pipe(
        gulpTheo({
          transform: {
            type: 'web'
          },
          format: {
            type: '1337v4r5'
          }
        })
      )
      .pipe(
        through.obj((file, enc, next) => {
          expect(file.contents.toString('utf8')).toMatchSnapshot();
          next();
          done();
        })
      );
  });
});
