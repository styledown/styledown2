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
  var header = out.files['components.html'].sections.header
  t.true(header.parts.s1.type === 'text')
  t.true(header.parts.s1.content === '<p>This is a header</p>')
  t.true(header.parts.s2.type === 'example')
  t.true(header.parts.s2.language === 'haml')
  t.true(header.parts.s2.class === 'a b')
  t.regex(header.parts.s2.content, /= render 'header'/)
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

  t.true('shared-header-top' in out.files['components.html'].sections)
  t.pass()
})

test('multiple blocks', t => {
  var out = build({
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
  t.true(file.sections.header.title === 'header')
  t.true(file.sections.header.depth === 3)
  t.true(file.sections.header.parts.s1.id === 's1')
  t.true(file.sections.header.parts.s1.type === 'text')
  t.regex(file.sections.header.parts.s1.content, /This is a header/)

  t.true(file.sections.footer.title === 'footer')
  t.true(file.sections.footer.depth === 3)
  t.true(file.sections.footer.parts.s1.id === 's1')
  t.true(file.sections.footer.parts.s1.type === 'text')
  t.regex(file.sections.footer.parts.s1.content, /This is a footer/)
  t.pass()
})
