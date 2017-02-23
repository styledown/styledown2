const changeExtension = require('../helpers/change_extension')
const forEach = require('object-loops/for-each')
const parseFile = require('./parse_files/parse_file')
const transformLang = require('./parse_files/transform_lang')

/**
 * Parse files in `result._input` into `result.files` and `result.templates`.
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

/**
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
 * Export
 */

module.exports = parseFiles
