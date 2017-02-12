const test = require('ava')
const build = require('../../lib/build')
const dedent = require('dedent')

const FILES = {
  'components.md': {
    contents: dedent `
      # Components
      ### header
      This is a header

      ~~~ example.haml
      = render 'header'
      ~~~`
  }
}

test('block with example', t => {
  const result = build(FILES)

  var file = result.files['components.html']
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

test('renders assets', t => {
  const result = build(FILES)

  t.true(result.files['styledown/script.js'].type === 'application/javascript')
  t.true(result.files['styledown/style.css'].type === 'text/css')

  t.true(result.files['styledown/script.js'].layout === 'script')
  t.true(result.files['styledown/style.css'].layout === 'style')
})

test('respects skipAssets: true', t => {
  const result = build(FILES, { skipAssets: true })

  t.true(typeof result.files['styledown/script.js'] === 'undefined')
  t.true(typeof result.files['styledown/style.css'] === 'undefined')
})
