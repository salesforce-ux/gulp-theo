const gulp = require('gulp')
const through = require('through2')
const theo = require('../')

describe('gulp-theo', () => {
  it('transforms Design Tokens as Sass', (done) => {
    gulp.src('__fixtures__/a.json')
      .pipe(theo.plugin(
        {
          transform: {
            type: 'web'
          },
          format: {
            type: 'scss'
          }
        }
      ))
      .pipe(
        through.obj((file, enc, next) => {
          expect(file.contents.toString('utf8')).toMatchSnapshot()
          next()
          done()
        })
      )
  })
  it('transforms multiple files as Sass', (done) => {
    gulp.src([
      '__fixtures__/a.json',
      '__fixtures__/props.yml'
    ])
    .pipe(theo.plugin(
      {
        transform: {
          type: 'web'
        },
        format: {
          type: 'scss'
        }
      }
    ))
    .pipe(
      through.obj((file, enc, next) => {
        if (file.relative === 'a.json') {
          expect(file.contents.toString('utf8')).toMatchSnapshot()
        }
        console.log(file.relative)
        if (file.relative === 'props.scss') {
          expect(file.contents.toString('utf8')).toMatchSnapshot()
          done()
        }
        next()
      })
    )
  })
  it('throws an error if a bad configuration is passed', (done) => {
    gulp.src('__fixtures__/a.json')
    .pipe(theo.plugin(
      {
        format: {
          type: 'scss'
        }
      }
    ))
    .on('error', (e) => {
      expect(e.message).toBe('Transform "undefined" is not registered')
      done()
    })
  })

  it('transforms Design Tokens as 1337v4r5', (done) => {
    theo.registerFormat('1337v4r5', `
      😀{{stem meta.file}}-1337:
        {{#each props as |prop|}}
          '{{kebabCase prop.name}}': 😇({{prop.value}})
        {{/each}}
    `)
    gulp.src('__fixtures__/a.json')
    .pipe(theo.plugin(
      {
        transform: {
          type: 'web'
        },
        format: {
          type: '1337v4r5'
        }
      }
    ))
    .pipe(
      through.obj((file, enc, next) => {
        expect(file.contents.toString('utf8')).toMatchSnapshot()
        next()
        done()
      })
    )
  })
})
