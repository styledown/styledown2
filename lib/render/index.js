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
    result[fname] = renderFile(file, { meta, templates })
    return result
  }, {})

  return files
}

/**
 * Renders a file. Delegate of render().
 * @private
 *
 *     renderFile({ title: 'John', layout: 'html' }, {
 *       meta: {},
 *       templates: { 'html': 'Hello {{title}}' }
 *     })
 */

function renderFile (file, { meta, templates }) {
  const figureSrc = getFigureSrc(templates)
  const filedata = Object.assign({}, file, { meta, figureSrc })
  const layout = file.layout

  const contents = layout
    ? renderTemplate(filedata, templates, layout)
    : ''

  const type = filedata.type

  return { contents, type }
}

function getFigureSrc (templates) {
  // A lambda function for mustache
  return function () {
    const data = { content: this.content }
    const html = renderTemplate(data, templates, 'iframeHtml')
    return 'data:text/html;base64,' + btoa(html)
  }
}

function btoa (string) {
  if (global.btoa) return btoa(string)
  return new Buffer(string).toString('base64')
}

/*
 * Export
 */

module.exports = render
