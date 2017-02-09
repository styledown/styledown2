var parseFile = require('./parse/parse_file')
var transformLang = require('./parse/transform_lang')
var basename = require('path').basename
var dirname = require('path').dirname
var tocify = require('./tocify')

/**
 * Parses files synchronously.
 *
 * @param {Object[]} files Files to be parsed. Each file has `{name, contents}`.
 * @param {string[]} options.transform Languages to be transformed
 * @returns {Object} raw data in the shape of `{files, toc}`.
 * @example
 *
 *     parse([
 *       { name: 'README.md', contents: '...' },
 *     ], { transform: ['jade'] })
 */

function parse (files, options) {
  var result = {
    files: {}
  }

  files.forEach(function (file) {
    var name = file.name || '[stdin]'
    var raw = file.contents || file.data || ''
    if (basename(name) === 'README.md') {
      result.toc = tocify(raw, {}, { base: dirname(name) })
    } else {
      var data = parseFile(raw, name)
      transformLang(data, options)
      result.files[name] = data
    }
  })

  return result
}

module.exports = parse
