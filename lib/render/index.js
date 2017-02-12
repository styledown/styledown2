const hogan = require('hogan.js')
const map = require('object-loops/map')

function render (data, templates) {
  const compiled = map(templates, str => hogan.compile(str))
  return compiled.html.render(data, templates)
}

module.exports = render
