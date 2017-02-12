const hogan = require('hogan.js')
const map = require('object-loops/map')

/**
 * Renders `templates.html` as a Mustache template based on `data`.
 * `templates` holds partials.
 * @private
 *
 *     data = { name: 'John' }
 *     templates = {
 *       html: '<div>{{> message}}</div>',
 *       message: 'hello {{name}}'
 *     }
 *
 *     render(data, templates)
 *     => '<div>hello John</div>'
 */

function render (data, templates) {
  const compiled = map(templates, str => hogan.compile(normalize(str)))
  return compiled.html.render(data, templates)
}

/**
 * Simplifies the template by removing indentation whitespaces.
 * @private
 *
 *     normalize('<div>\n  {{title}}\n</div>')
 *     => '<div>\n{{title}}\n</div>'
 */

function normalize (str) {
  return str.replace(/^ +/gm, '')
}

/*
 * Export
 */

module.exports = render
