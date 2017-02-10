var test = require('ava')
var styledown = require('../index')
var r = require('redent')

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

  var data = styledown.build(out)
  var html = data.files['components.html'].sections.menu

  t.regex(html, /<ul class="styleguide-menu">/)
  t.regex(html, /<li class="styleguide-menu-item -level-1">/)
  t.regex(html, /<a href="components.html"/)
})
