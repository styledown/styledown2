const r = require('redent')

var html = r(`
  <!doctype html>
  <html>
    <head>
      <title>Hello</title>
    </head>
    <body>
      {{>body}}
    </body>
  </html>
`)

var body = r(`
  <div class='styleguide-body'>
    This is my body
  </div>
`)

module.exports = { html, body }
