const basename = require('path').basename
const changeExtension = require('../helpers/change_extension')
const dirname = require('path').dirname
const forEach = require('object-loops/for-each')
const parseFile = require('./parse_file')
const tocify = require('../tocify')
const transformLang = require('./transform_lang')

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
  var result = {
    files: {},
    templates: {},
    meta: {}
  }

  const extension = 'extension' in options ? options.extension : '.html'

  addToc(result, files, { extension })
  addDefaultTemplates(result)

  // Parse files
  forEach(files, (file, filename) => {
    var name = file.name || filename
    var raw = file.contents || file.data || ''

    if (name.match(/^templates/)) {
      addTemplate(result, filename, file)
    } else {
      const newName = changeExtension(name, extension)
      var data = parseFile(raw, { source: name })
      transformLang(data, options)
      data.layout = 'html'
      data.type = 'text/html'
      data.toc = result.toc // see addToc()
      result.files[newName] = data
    }
  })

  // Add CSS/JS
  if (!options.skipAssets) addAssets(result)

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

function addToc (result, files, options = {}) {
  if (files['README.md']) {
    result.toc = tocify(files['README.md'].contents, options)
    delete files['README.md']
  }
}

/*
 * Adds built-in templates
 */

function addDefaultTemplates (result) {
  result.templates = Object.assign({}, require('../templates'))
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
