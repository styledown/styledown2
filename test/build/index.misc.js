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
  var header = out.files['components.html'].sections[0]
  t.true(header.parts[0].type === 'text')
  t.true(header.parts[0].content === '<p>This is a header</p>')
  t.true(header.parts[1].type === 'example')
  t.true(header.parts[1].language === 'haml')
  t.true(header.parts[1].class === 'a b')
  t.regex(header.parts[1].content, /= render 'header'/)
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
