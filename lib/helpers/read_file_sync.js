const fs = require('fs')
const cache = require('../cache')

/**
 * A cached version of fs.readFileSync.
 * @private
 */

function readFileSync (file, encoding) {
  const stats = fs.statSync(file)
  const key = [ 'fs.readFileSync', stats.mtime, encoding ]

  return cache.fetch(key, () => fs.readFileSync(file, encoding))
}

module.exports = readFileSync
