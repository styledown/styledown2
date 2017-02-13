const hogan = require('hogan.js')
const map = require('object-loops/map')
const fetch = require('../cache').fetch

/**
 * Renders a template in `templates` as a Mustache template based on `data`.
 * `templates` holds partials.
 * @private
 *
 *     data = { name: 'John' }
 *     templates = {
 *       html: '<div>{{> message}}</div>',
 *       message: 'hello {{name}}'
 *     }
 *
 *     render(data, templates, 'html')
 *     => '<div>hello John</div>'
 */

function renderTemplate (data, templates, template = 'html') {
  // Note that Hogan.js pollutes this!
  const compiled =
    fetch([ 'render.templates', templates ], () =>
      map(templates, compileTemplate))

  const tpl = compiled[template]
  if (!tpl) throw new Error(`render(): unknown template '${template}'`)

  return tpl.render(data, compiled)
}

function compileTemplate (str) {
  return fetch([ 'render.compileTemplate', str ], () =>
    hogan.compile(str))
}

/*
 * Export
 */

module.exports = renderTemplate
