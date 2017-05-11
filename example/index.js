// Copyright (c) 2015-present, salesforce.com, inc. All rights reserved
// Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license

const defaultTokens = require('./dist/default.array')
const mobileTokens = require('./dist/mobile.array')

console.log('Default tokens:')
console.log(JSON.stringify(defaultTokens, null, 2))
console.log('--------------')
console.log('Mobile tokens:')
console.log(JSON.stringify(mobileTokens, null, 2))
