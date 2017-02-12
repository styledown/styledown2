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
 * @param {Boolean} options.skipAssets If true, skips JS/CSS
 * @returns {Object} raw data in the shape of `{files, toc}`.
 * @example
 *
 *     parse({
 *       'README.md': { contents: '...' },
 *     }, { transform: ['jade'] })
 */

function build (files, options = {}) {
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
      data.type = 'text/html'
      result.files[name] = data
    }
  })

  // Add templates
  result.templates = require('../templates')

  // Add CSS/JS
  if (!options.skipAssets) addAssets(result)

  return result
}

/*
 * Adds CSS/JS.
 */

function addAssets (result) {
  result.files['styledown/script.js'] = {
    layout: 'script', type: 'application/javascript'
  }

  result.files['styledown/style.css'] = {
    layout: 'style', type: 'text/css'
  }
}

/*
 * Export
 */

module.exports = build
