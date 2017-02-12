const test = require('ava')
const parse = require('../lib/parse')
const dedent = require('dedent')

test('block with example', t => {
  var out = parse({
    'components.md': {
      contents: dedent `
        # Components
        ### header
        This is a header

        ~~~ example.haml
        = render 'header'
        ~~~`
    }
  })

  var file = out.files['components.md']
  t.true(file.title === 'Components')

  var header = file.sections.header
  t.true(header.title === 'header')
  t.true(header.depth === 3)
  t.true(header.id === 'header')
  t.true(header.parts.s1.id === 's1')
  t.true(header.parts.s1.type === 'text')
  t.true(header.parts.s1.content === '<p>This is a header</p>')
  t.true(header.parts.s2.id === 's2')
  t.true(header.parts.s2.type === 'example')
  t.true(header.parts.s2.language === 'haml')
  t.regex(header.parts.s2.content, /= render 'header'/)
})
