const basename = require('path').basename
const changeExtension = require('../helpers/change_extension')
const dirname = require('path').dirname
const forEach = require('object-loops/for-each')
const parseFile = require('./parse_file')
const tocify = require('../tocify')
const transformLang = require('./transform_lang')

const DEFAULTS = {
  extension: '.html'
}

/**
 * Parses files synchronously.
 *
 * @param {Object[]} files Files to be parsed. Each file has `{name, contents}`.
 * @param {string[]} options.transform Languages to be transformed
 * @param {string} options.extension Extension. Defaults to '.html'
 * @param {Boolean} options.skipAssets If true, skips JS/CSS
 * @returns {Object} raw data in the shape of `{files, toc}`.
 * @example
 *
 *     parse({
 *       'README.md': { contents: '...' },
 *     }, { transform: ['jade'] })
 */

function build (files, options = {}) {
  let result = {
    _input: files, // to be removed later
    files: {},
    templates: {},
    meta: Object.assign({}, DEFAULTS, options)
  }

  // Add `result.toc` to be picked up later
  addToc(result)

  // Add default templates in templates/index.js
  require('../filters/add_default_templates')(result)

  // Parse files
  parseFiles(result)

  // Marks sections that contain examples with an extra class
  require('../filters/mark_example_sections')(result)

  // Create example iframe documents
  require('../filters/create_frames')(result)

  // Add CSS/JS
  require('../filters/add_assets')(result)

  delete result._input
  return result
}

/**
 * Parse files into `result`
 */

function parseFiles (result) {
  const files = result._input
  forEach(files, (file, filename) => {
    var name = file.name || filename
    var raw = file.contents || file.data || ''

    if (name.match(/^templates/)) {
      addTemplate(result, filename, file)
    } else {
      const newName = changeExtension(name, result.meta.extension)
      var data = parseFile(raw, { source: name })
      transformLang(data, result.meta)
      data.layout = 'styleguide'
      data.type = 'text/html'
      data.toc = result.toc // see addToc()
      result.files[newName] = data
    }
  })

  return result
}

/*
 * Adds a template.
 * @example
 *
 *     addTemplate(result, 'templates/head.html', '{{{inherit}}}<!-- hi -->')
 *
 *     result.templates['head'] === '...<!-- hi -->'
 */

function addTemplate (result, filename, file) {
  const templateName = filename
    .replace(/^templates\//, '')
    .replace(/\.[^\.]+$/, '')

  const old = result.templates[templateName]

  result.templates[templateName] = file.contents
    .replace(/{{{\s*inherit\s*}}}/g, old || '')
}

/*
 * Adds toc (table of contents)
 */

function addToc (result) {
  const files = result._input

  if (files['README.md']) {
    result.toc = tocify(files['README.md'].contents, result.meta)
    delete files['README.md']
  }

  return result
}

/*
 * Export
 */

module.exports = build
