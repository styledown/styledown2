const dedent = require('dedent')

const html = dedent `
<!doctype html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>{{ title }}</title>
    {{> head}}
  </head>
  <body>
    {{> header}}
    {{> sidebar}}
    {{> body}}
    {{> footer}}
  </body>
</html>`

// Things to add before </head>
const head =
`<meta name='generator' content='Styledown2 ${require('../../package.json').version}'>
<meta name='viewport' content='width=device-width, initial-scale=1'>`

// Things to add after <body>
const header = ''

// Things to add before </body>
const footer = ''

const sidebar = dedent `
<div class='styleguide-sidebar'>
  <input type='checkbox' id='sidebar-toggle' />
  <label className='button' for='sidebar-toggle'></label>
  <label className='screen' for='sidebar-toggle'></label>
  <div class='menu contents'>{{> menu}}</div>
</div>`

const menu = dedent `
<div class='styleguide-menu'>
</div>`

const body = dedent `
<div class='styleguide-body'>
  {{#sections}}{{> section}}{{/sections}}
</div>`

const section = dedent `
<section class='styleguide-section -h{{depth}}'>
  <h{{depth}} id='{{id}}'>{{title}}</h{{depth}}>
  {{#parts}}{{> part}}{{/parts}}
</section>`

const part = dedent `
{{#isText}}{{> textPart}}{{/isText}}
{{#isCode}}{{> codePart}}{{/isCode}}
{{#isExample}}{{> examplePart}}{{/isExample}}`

const textPart = dedent `
<div class='styleguide-text'>{{{content}}}</div>`

const codePart = dedent `
<div class='styleguide-code'>
  <pre class='{{preClass}}'><code>{{{content}}}</code></pre>
</div>`

const examplePart = dedent `
<div class='styleguide-example'>
  <div class='figure'>{{{content}}}</div>
  <div class='source'>
    <pre class='{{preClass}}'><code>{{{source}}}</code></pre>
  </div>
</div>`

/*
 * Export
 */

module.exports = {
  html, head, header, footer, sidebar, menu, body, section, part, textPart,
  codePart, examplePart
}
