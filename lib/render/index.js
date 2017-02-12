const renderTemplate = require('./render_template')
const reduce = require('object-loops/reduce')

/**
 * Renders.
 * @private
 * @example
 *
 *     data = { files, templates, meta }
 *     render(data)
 *     => { 'buttons.html': { contents: '...' } }
 */

function render (data = {}, options = {}) {
  const templates = data.templates || {}
  const meta = data.meta || {}

  const files = reduce(data.files, (result, file, fname) => {
    const data = Object.assign({}, meta, file)
    const layout = file.layout

    const contents = layout
      ? renderTemplate(data, templates, layout)
      : undefined

    result[fname] = { contents }
    return result
  }, {})

  return files
}

/*
 * Export
 */

module.exports = render
