const test = require('ava')
const build = require('../../lib/build')
const dedent = require('dedent')

test('block with code and class', t => {
  var out = build({
    'components.md': {
      contents: dedent `
        ### header
        This is a header

        ~~~ example.haml.a.b
        = render 'header'
        ~~~`
    }
  })

  let header, part
  header = out.files['components.html'].sections[0]
  part = header.parts[0]
  t.true(part.type === 'text')
  t.true(part.content === '<p>This is a header</p>')

  part = header.parts[1]
  t.true(part.type === 'example')
  t.true(part.isExample === true)
  t.true(part.language === 'haml')
  t.true(part.class === 'a b')
})

test('slugifying', t => {
  var out = build({
    'components.md': {
      contents: dedent `
        ### shared/header (top)
        This is a header
        ~~~`
    }
  })

  t.true(out.files['components.html'].sections[0].id === 'shared-header-top')
  t.pass()
})

test('multiple blocks', t => {
  let section, part

  const out = build({
    'components.md': {
      contents: dedent `
        # Components
        ### header
        This is a header

        ### footer
        This is a footer`
    }
  })

  const file = out.files['components.html']
  t.true(file.title === 'Components')

  section = file.sections[1]
  t.true(section.title === 'header')
  t.true(section.depth === 3)

  part = section.parts[0]
  t.true(part.id === 'header-1')
  t.true(part.type === 'text')
  t.regex(part.content, /This is a header/)

  section = file.sections[2]
  t.true(section.title === 'footer')
  t.true(section.depth === 3)

  part = section.parts[0]
  t.true(part.id === 'footer-1')
  t.true(part.type === 'text')
  t.regex(part.content, /This is a footer/)
})

test('text before headings', t => {
  let section, part

  const out = build({
    'components.md': {
      contents: dedent `
        Hello
        ### First header`
    }
  })

  const file = out.files['components.html']

  section = file.sections[0]
  t.true(section.hasHeading === false)
  t.true(section.id === '_prelude')
  t.true(section.depth === 0)
  t.true(section.class === '')
  t.true(section.parts.length === 1)

  part = section.parts[0]
  t.true(part.id === '_prelude-text')
  t.true(part.type === 'text')
  t.true(part.content === '<p>Hello</p>')

  section = file.sections[1]
  t.true(section.hasHeading === true)
})

test('text before headings with multiple tokens', t => {
  let section, part

  const out = build({
    'components.md': {
      contents: dedent `
        Hello

        * World

        ### First header`
    }
  })

  const file = out.files['components.html']

  section = file.sections[0]
  t.true(section.hasHeading === false)
  t.true(section.id === '_prelude')
  t.true(section.depth === 0)
  t.true(section.class === '')
  t.true(section.parts.length === 1)

  part = section.parts[0]
  t.true(part.id === '_prelude-text')
  t.true(part.type === 'text')
  t.true(part.content === '<p>Hello</p>\n<ul>\n<li>World</li>\n</ul>')

  section = file.sections[1]
  t.true(section.hasHeading === true)
})

test('text before headings without headings', t => {
  let section, part

  const out = build({
    'components.md': {
      contents: dedent `
        Hello

        * World`
    }
  })

  const file = out.files['components.html']

  section = file.sections[0]
  t.true(section.hasHeading === false)
  t.true(section.id === '_prelude')
  t.true(section.depth === 0)
  t.true(section.class === '')
  t.true(section.parts.length === 1)

  part = section.parts[0]
  t.true(part.id === '_prelude-text')
  t.true(part.type === 'text')
  t.true(part.content === '<p>Hello</p>\n<ul>\n<li>World</li>\n</ul>')
})
