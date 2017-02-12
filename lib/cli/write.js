const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp').sync
const forEach = require('object-loops/for-each')

/**
 * Writes files to a folder. `files` is in Metalsmith format.
 * @private
 * @example
 *
 *     files = {
 *       'readme.html': { contents: '...' }
 *     }
 *
 *     writeFiles(files, __dirname)
 */

function write (files, dir) {
  if (dir === '-') {
    return writeToStdout(files)
  } else {
    return writeFiles(files, dir)
  }
}

function writeFiles (files, dir) {
  if (typeof files === 'object') {
    mkdirp(dir)
    forEach(files, (file, fname) => {
      fs.writeFileSync(path.join(dir, fname), file.contents, 'utf-8')
    })
  } else {
    mkdirp(path.dirname(dir))
    fs.writeFileSync(dir, files, 'utf-8')
  }
}

function writeToStdout (files) {
  if (typeof files === 'object') {
    process.stdout.write(JSON.stringify(files))
  } else {
    process.stdout.write(files)
  }
}

module.exports = write
