const readFileSync = require('fs').readFileSync
const dedent = require('dedent')
const resolve = require('path').resolve

const html = dedent `
<!doctype html>
<html>
  <head>
    <meta charset='utf-8'>
    {{> htmlHead}}
  </head>
  <body>
   {{> htmlBody}}
  </body>
</html>`

const htmlHead = dedent `
<title>{{title}}</title>
{{> head}}
{{{meta.head}}}`

const htmlBody = dedent `
{{> header}}
{{> sidebar}}
{{> body}}
{{> footer}}
{{{meta.footer}}}`

// Things to add before </head>
const head = dedent `
<meta name='generator' content='Styledown2 ${require('../../package.json').version}'>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<link rel='stylesheet' href='{{base}}styledown/style.css' />
<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' />`
// TODO: Remove bootstrap

// Things to add after <body>
const header = ''

// Things to add before </body>
const footer = dedent `
<script src='{{base}}styledown/script.js'></script>`

const sidebar = dedent `
<div class='styleguide-sidebar'>
  <input type='checkbox' id='sidebar-toggle' />
  <label class='button' for='sidebar-toggle'></label>
  <label class='screen' for='sidebar-toggle'></label>
  <div class='menu contents'>
    {{> sidebarContents}}
  </div>
</div>`

const sidebarContents = dedent `
{{> menu}}`

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

const script = readFileSync(resolve(__dirname, '../../data/styledown.js'), 'utf-8')
const style = readFileSync(resolve(__dirname, '../../data/styledown.css'), 'utf-8')

/*
 * Export
 */

module.exports = {
  html, htmlHead, htmlBody, head, header, footer, sidebar, sidebarContents,
  menu, body, section, part, textPart, codePart, examplePart, script, style }
