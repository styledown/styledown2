const resolve = require('path').resolve

const html =
`<!doctype html>
<html>
  <head>
    <meta charset='utf-8'>
    {{> htmlHead}}
  </head>
  <body>
   <div class='styledown-layout'>
     {{> htmlBody}}
   </div>
  </body>
</html>`

const htmlHead =
`<title>{{> title}}</title>
{{> head}}`

const htmlBody =
`{{> sidebar}}
{{> body}}
{{> footer}}`

// Text inside the <title> element
const title = '{{title}}'

// Things to add before </head>
const head =
`<meta name='generator' content='Styledown2 ${require('../../package.json').version}'>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<link rel='stylesheet' href='{{base}}styledown/style.css' />`

// Things to add before </body>
const footer =
`<script src='{{base}}styledown/script.js'></script>`

const sidebar =
`<div class='styleguide-sidebar'>
  <input type='checkbox' id='styleguide-sidebar-toggle' />
  <label class='styleguide-sidebar-button' for='styleguide-sidebar-toggle'></label>
  <label class='styleguide-sidebar-screen' for='styleguide-sidebar-toggle'></label>
  <div class='styleguide-sidebar-contents'>
    {{> sidebarContents}}
  </div>
</div>`

const sidebarContents =
`{{> menu}}`

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
  <div class='styleguide-example-figure'>{{{content}}}</div>
  <div class='styleguide-example-source'>
    <pre class='{{preClass}}'><code>{{{source}}}</code></pre>
  </div>
</div>`

const menu =
`<ul class='styleguide-menu'>
{{#toc}}{{#sections}}{{> menuItem}}{{/sections}}{{/toc}}
</ul>`

const menuItem =
`<li class='styleguide-menu-item -level-{{depth}} {{#isParent}}-parent{{/isParent}}'>
  {{#href}}{{> menuItemLink}}{{/href}}
  {{^href}}{{> menuItemSpan}}{{/href}}
  {{#hasHeadings}}{{> headingList}}{{/hasHeadings}}
  {{#isParent}}{{> menuItemSubmenu}}{{/isParent}}
</li>`

const menuItemLink =
`<a href='{{href}}' class='link title {{#isActive}}-active{{/isActive}}'>
  {{title}}
</a>`

const menuItemSpan =
`<span class='title'>{{title}}</span>`

const menuItemSubmenu =
`<ul class='submenu'>
  {{#sections}}{{> menuItem}}{{/sections}}
</ul>`

const headingList =
`<ul class='headings styleguide-heading-list -depth-{{depth}}'>
  {{#headings}}{{> headingItem}}{{/headings}}
</ul>`

const headingItem =
`<li class='styleguide-heading-item'>
<!-- ... -->
</li>`

const script = require('fs').readFileSync(resolve(__dirname, '../../cache/script.js'), 'utf-8')
const style = require('fs').readFileSync(resolve(__dirname, '../../cache/style.css'), 'utf-8')

/*
 * Export
 */

module.exports = {
  html, htmlHead, htmlBody, title, head, footer, sidebar, sidebarContents,
  menu, body, section, part, textPart, codePart, examplePart, script, style,
  menuItem, menuItemLink, menuItemSpan, menuItemSubmenu, headingList,
  headingItem }
