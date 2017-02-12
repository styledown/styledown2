const dirname = require('path').dirname
const extname = require('path').extname
const glob = require('glob').sync
const readFileSync = require('fs').readFileSync
const sep = require('path').sep
const statSync = require('fs').statSync

const TEXT_EXTENSIONS = [
  '.md', '.js', '.css', '.html'
]

/**
 * Reads files in a path.
 */

function read (path, options = {}) {
  let files

  path = untrail(path)
  const spec = options.spec || '{styledown.json,**/*.md}'
  const stat = statSync(path)

  if (stat.isFile()) {
    files = [path]
    path = dirname(path)
  } else if (stat.isDirectory()) {
    files = glob(path + sep + spec).sort()
  } else {
    return {}
  }

  return files.reduce((result, file) => {
    const base = file.slice(path.length + sep.length)
    const isTextFile = isText(file)
    result[base] = {
      contents: readFileSync(file, isTextFile ? 'utf-8' : null)
    }
    return result
  }, {})
}

/**
 * Adds a trailing slash.
 * @private
 *
 *      untrail('sup')  => 'sup'
 *      untrail('sup/') => 'sup'
 */

function untrail (str) {
  const sep = require('path').sep

  if (str.substr(str.length - 1) === sep) {
    return str.substr(0, str.length - 1)
  } else {
    return str
  }
}

/**
 * Checks if a file is a text file.
 * @private
 *
 *     isText('foo.md') => true
 *     isText('aa.jpg') => false
 */

function isText (file) {
  const ext = extname(file)
  return TEXT_EXTENSIONS.indexOf(ext) !== -1
}

/*
 * Export
 */

module.exports = read
