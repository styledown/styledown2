const fs = require('fs')
const fetch = require('../cache').fetch

/**
 * A cached version of fs.readFileSync.
 * @private
 */

function readFileSync (file, encoding) {
  const fullpath = require('path').resolve(file)
  const stats = fs.statSync(fullpath)
  const key = [ 'fs.readFileSync', fullpath, stats.mtime, encoding ]

  return fetch(key, () => fs.readFileSync(fullpath, encoding))
}

module.exports = readFileSync
