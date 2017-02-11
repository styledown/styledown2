const html =
`<!doctype html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>Hello</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
  </head>
  <body>
    {{> sidebar}}
    {{> body}}
  </body>
</html>`

const sidebar =
`<div class='styleguide-sidebar'>
  <input type='checkbox' id='sidebar-toggle' />
  <label className='button' for='sidebar-toggle'></label>
  <label className='screen' for='sidebar-toggle'></label>
  <div class='menu contents'>
    {{> menu}}
  </div>
</div>`

const menu =
`<div class='styleguide-menu'>
</div>`

const body =
`<div class='styleguide-body'>
  {{#sections}}{{> section}}{{/sections}}
</div>`

const section =
`<section class='styleguide-section -h{{depth}}'>
  <h{{depth}} id='{{id}}'>{{title}}</h{{depth}}>
  {{#parts}}{{> part}}{{/parts}}
</section>`

const part =
`{{#isText}}{{> textPart}}{{/isText}}
{{#isCode}}{{> codePart}}{{/isCode}}
{{#isExample}}{{> examplePart}}{{/isExample}}`

const textPart =
`<div class='styleguide-text'>{{{content}}}</div>`

const codePart =
`<div class='styleguide-code'>
  <pre class='{{preClass}}'><code>{{{content}}}</code></pre>
</div>`

const examplePart =
`<div class='styleguide-example'>
  <div class='figure'>{{{content}}}</div>
  <div class='source'>
    <pre class='{{preClass}}'><code>{{{source}}}</code></pre>
  </div>
</div>`

module.exports = {
  html, sidebar, menu, body, section, part, textPart, codePart, examplePart
}
