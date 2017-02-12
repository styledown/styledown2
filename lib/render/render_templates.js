const hogan = require('hogan.js')
const map = require('object-loops/map')
const cache = require('../cache')

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
  const compiled =
    cache.fetch([ 'render.templates', templates ], () =>
      map(templates, compileTemplate))
  return compiled.html.render(data, templates)
}

function compileTemplate (str) {
  return cache.fetch([ 'render.compileTemplate', str ], () =>
    hogan.compile(normalize(str)))
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
