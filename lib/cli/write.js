const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp').sync
const forEach = require('object-loops/for-each')
const renderData = require('./render_data')

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

function write (files, dir, options) {
  if (dir === '-') {
    return writeToStdout(files, options)
  } else {
    return writeFiles(files, dir)
  }
}

function writeFiles (files, dir) {
  if (typeof files === 'object') {
    forEach(files, (file, fname) => {
      const fullpath = path.join(dir, fname)
      mkdirp(path.dirname(fullpath))
      fs.writeFileSync(fullpath, file.contents, 'utf-8')
    })
  } else {
    mkdirp(path.dirname(dir))
    fs.writeFileSync(dir, files, 'utf-8')
  }
}

function writeToStdout (files, options) {
  if (typeof files === 'object') {
    process.stdout.write(renderData(files), options)
  } else {
    process.stdout.write(files)
  }
}

module.exports = write
