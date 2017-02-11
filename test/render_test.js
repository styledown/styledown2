var test = require('ava')
var styledown = require('../index')
var r = require('redent')

test('rendering', t => {
  var out = styledown.parse([
    { name: 'components.md',
      data: r(`
        # Components
        ### header
        This is a header

        ~~~ example.haml
        = render 'header'
        ~~~
      `) }
  ])
  var tpl = styledown.build(out)
  var html = styledown.render(tpl, 'components.html')
  t.regex(html.sections.body, /<h1 id="components">Components<\/h1>/)
  t.regex(html.sections.body, /<h3 id="header">header<\/h3>/)
  t.regex(html.sections.body, /<p>This is a header<\/p>/)
})

test('rendering TOC', t => {
  var out = styledown.parse([
    { name: 'README.md',
      data: r(`
        # Table of Contents
        * [Components](components.md)
      `) },
    { name: 'components.md',
      data: 'Hello' }
  ])

  var tpl = styledown.build(out)

  var html = styledown.render(tpl, 'components.html', {
    layout: '<%- sections.menu %>'
  })

  t.regex(html, /<ul class="styleguide-menu">/)
  t.regex(html, /<li class="styleguide-menu-item -level-1">/)
  t.regex(html, /<a href="components.html"/)
})
