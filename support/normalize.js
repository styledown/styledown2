const defaultHtml = '<!doctype html><html><head><meta charset="utf-8">' +
  '</head><body></body></html>'

function normalize (html) {
  const jsdom = require('jsdom').jsdom

  const document = jsdom(defaultHtml, {})
  const window = document.defaultView
  const root = document.createElement('body')
  root.innerHTML = html

  return root.innerHTML.replace(/[\n\r\t\s]+/gm, ' ').trim()
}

module.exports = normalize
