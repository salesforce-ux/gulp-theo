// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

const gutil = require('gulp-util');
const theo = require('theo');
const through = require('through2');

module.exports = function(options) {
  return through.obj(function(file, enc, callback) {
    if (file.isStream()) {
      const err = this.emit(
        'error',
        new gutil.PluginError('gulp-theo', 'Streaming not supported')
      );
      return callback(err);
    }
    const opts = Object.assign({}, options, {
      transform: Object.assign({}, options.transform, {
        file: file.path,
        data: file.contents.toString('utf8')
      })
    });
    theo
      .convert(opts)
      .then(res => {
        file.path = file.path.replace(/(json|yml)$/, options.format.type);
        file.contents = Buffer.from(res);
        callback(null, file);
      })
      .catch(e => {
        const err = new gutil.PluginError('gulp-theo', e, { trace: true });
        callback(err, file);
      });
  });
};
