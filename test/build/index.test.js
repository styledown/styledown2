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
  let header

  const file = result.files['components.html']
  t.true(file.title === 'Components')

  header = file.sections[0]
  t.true(header.title === 'Components')
  t.true(header.depth === 1)
  t.true(header.id === 'components')

  header = file.sections[1]
  t.true(header.title === 'header')
  t.true(header.depth === 3)
  t.true(header.id === 'header')
  t.true(header.parts[0].id === 'header-1')
  t.true(header.parts[0].type === 'text')
  t.true(header.parts[0].content === '<p>This is a header</p>')
  t.true(header.parts[1].id === 'header-2')
  t.true(header.parts[1].type === 'example')
  t.true(header.parts[1].language === 'haml')
  t.regex(header.parts[1].content, /= render 'header'/)
})

test('blank extensions', t => {
  const result = build(FILES, { extension: '' })
  let header

  const file = result.files['components']
  t.true(file.title === 'Components')
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

test.only('frames', t => {
  const result = build(FILES)
  let header, file

  file = result.files['components.html']
  console.log('file:', require('util').inspect(file, { depth: null, colors: true }))
  t.true(file.title === 'Components')

  header = file.sections[0]
  t.true(header.title === 'Components')
  t.true(header.depth === 1)
  t.true(header.id === 'components')

  header = file.sections[1]
  t.true(header.title === 'header')
  t.true(header.depth === 3)
  t.true(header.id === 'header')
  t.true(header.parts[0].id === 'header-1')
  t.true(header.parts[0].type === 'text')
  t.true(header.parts[0].content === '<p>This is a header</p>')
  t.true(header.parts[1].id === 'header-2')
  t.true(header.parts[1].type === 'example')
  // t.true(header.parts[1].language === undefined)
  // t.true(header.parts[1].source === undefined)
  // t.true(header.parts[1].content === undefined)

  file = result.files['examples/components--header-2.html']
  console.log('file:', require('util').inspect(file, { depth: null, colors: true }))
  // t.true(file.type === 'text/html')
  // t.true(file.layout === 'figure')
  // t.true(file.part.content === '= render \'header\'')
  // t.true(file.part.source === '= render \'header\'')
  // t.true(file.part.language === 'haml')
  t.true(false)
})
