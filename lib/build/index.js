const forEach = require('object-loops/for-each')
const parseFile = require('./parse_file')
const transformLang = require('./transform_lang')
const basename = require('path').basename
const dirname = require('path').dirname
const tocify = require('../tocify')

/**
 * Parses files synchronously.
 *
 * @param {Object[]} files Files to be parsed. Each file has `{name, contents}`.
 * @param {string[]} options.transform Languages to be transformed
 * @returns {Object} raw data in the shape of `{files, toc}`.
 * @example
 *
 *     parse({
 *       'README.md': { contents: '...' },
 *     }, { transform: ['jade'] })
 */

function build (files, options) {
  var result = {
    files: {}
  }

  forEach(files, (file, filename) => {
    var name = file.name || filename
    var raw = file.contents || file.data || ''

    if (basename(name) === 'README.md') {
      result.toc = tocify(raw, {}, { base: dirname(name) })
    } else {
      var data = parseFile(raw, name)
      transformLang(data, options)
      data.layout = 'html'
      result.files[name] = data
    }
  })

  // Add templates
  result.templates = require('../templates')

  return result
}

module.exports = build
