const test = require('ava')
const build = require('../lib/build')
const dedent = require('dedent')

test('build: block with code and class', t => {
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
  var header = out.files['components.md'].sections.header
  t.true(header.parts.s1.type === 'text')
  t.true(header.parts.s1.content === '<p>This is a header</p>')
  t.true(header.parts.s2.type === 'example')
  t.true(header.parts.s2.language === 'haml')
  t.true(header.parts.s2.class === 'a b')
  t.regex(header.parts.s2.content, /= render 'header'/)
})

test('build: slugifying', t => {
  var out = build({
    'components.md': {
      contents: dedent `
        ### shared/header (top)
        This is a header
        ~~~`
    }
  })

  t.true('shared-header-top' in out.files['components.md'].sections)
  t.pass()
})

test('build: multiple blocks', t => {
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

  // console.log(require('util').inspect(out, { depth: null }))
  t.true(out.files['components.md'].title === 'Components')
  t.true(out.files['components.md'].sections.header.title === 'header')
  t.true(out.files['components.md'].sections.header.depth === 3)
  t.true(out.files['components.md'].sections.header.parts.s1.id === 's1')
  t.true(out.files['components.md'].sections.header.parts.s1.type === 'text')
  t.regex(out.files['components.md'].sections.header.parts.s1.content, /This is a header/)

  t.true(out.files['components.md'].sections.footer.title === 'footer')
  t.true(out.files['components.md'].sections.footer.depth === 3)
  t.true(out.files['components.md'].sections.footer.parts.s1.id === 's1')
  t.true(out.files['components.md'].sections.footer.parts.s1.type === 'text')
  t.regex(out.files['components.md'].sections.footer.parts.s1.content, /This is a footer/)
  t.pass()
})
