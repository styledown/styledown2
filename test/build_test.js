var test = require('ava')
var styledown = require('../index')
var r = require('redent')

test('one link item', t => {
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

  t.deepEqual(html, [
    '<ul class="styleguide-menu">',
    '<li class="styleguide-menu-item -level-1">',
    '<a href="components.html" class="link title">Components</a>',
    '</li>',
    '</ul>'
  ].join(''))
})

test('one text item', t => {
  var out = styledown.parse([
    { name: 'README.md',
      data: r(`
        # Table of Contents
        * Components
      `) },
    { name: 'components.md',
      data: 'Hello' }
  ])

  var data = styledown.build(out)
  var html = data.files['components.html'].sections.menu

  t.deepEqual(html, [
    '<ul class="styleguide-menu">',
    '<li class="styleguide-menu-item -level-1">',
    '<span class="title">Components</span>',
    '</li>',
    '</ul>'
  ].join(''))
})

test('one link and one text item', t => {
  var out = styledown.parse([
    { name: 'README.md',
      data: r(`
        # Table of Contents
        * Buttons
        * [Components](components.md)
      `) },
    { name: 'components.md',
      data: 'Hello' }
  ])

  var data = styledown.build(out)
  var html = data.files['components.html'].sections.menu

  t.deepEqual(html, [
    '<ul class="styleguide-menu">',
    '<li class="styleguide-menu-item -level-1">',
    '<span class="title">Buttons</span>',
    '</li>',
    '<li class="styleguide-menu-item -level-1">',
    '<a href="components.html" class="link title">Components</a>',
    '</li>',
    '</ul>'
  ].join(''))
})

test('subitems', t => {
  var out = styledown.parse([
    { name: 'README.md',
      data: r(`
        # Table of Contents
        * [Components](components.md)
          * Buttons
      `) },
    { name: 'components.md',
      data: 'Hello' }
  ])

  var data = styledown.build(out)
  var html = data.files['components.html'].sections.menu

  t.deepEqual(html, [
    '<ul class="styleguide-menu">',
    '<li class="styleguide-menu-item -level-1 -parent">',
    '<a href="components.html" class="link title">Components</a>',
    '<ul class="submenu">',
    '<li class="styleguide-menu-item -level-2">',
    '<span class="title">Buttons</span>',
    '</li>',
    '</ul>',
    '</li>',
    '</ul>'
  ].join(''))
})

test('anchor', t => {
  var out = styledown.parse([
    { name: 'README.md',
      data: r(`
        # Table of Contents
        * [Components](components.md)
        * [Other components](components.md#hi)
      `) },
    { name: 'components.md',
      data: 'Hello' }
  ])

  var data = styledown.build(out)
  var html = data.files['components.html'].sections.menu

  t.deepEqual(html, [
    '<ul class="styleguide-menu">',
    '<li class="styleguide-menu-item -level-1">',
    '<a href="components.html" class="link title">Components</a>',
    '</li>',
    '<li class="styleguide-menu-item -level-1">',
    '<a href="components.html#hi" class="link title">Other components</a>',
    '</li>',
    '</ul>'
  ].join(''))
})
