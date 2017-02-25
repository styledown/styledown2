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

test('blank extensions', t => {
  const result = build(FILES, { extension: '' })
  let header

  const file = result.files['components']
  t.true(file.title === 'Components')
})

test('renders assets', t => {
  const result = build(FILES)
  let file

  file = result.files['styledown/styleguide.js']
  t.true(file.type === 'application/javascript')
  t.true(file.layout === 'styleguideJs')

  file = result.files['styledown/styleguide.css']
  t.true(file.type === 'text/css')
  t.true(file.layout === 'styleguideCss')

  file = result.files['styledown/figure.js']
  t.true(file.type === 'application/javascript')
  t.true(file.layout === 'figureJs')

  file = result.files['styledown/figure.css']
  t.true(file.type === 'text/css')
  t.true(file.layout === 'figureCss')
})

test('respects skipAssets: true', t => {
  const result = build(FILES, { skipAssets: true })
  let file

  file = result.files['styledown/styleguide.js']
  t.true(typeof file === 'undefined')

  file = result.files['styledown/styleguide.css']
  t.true(typeof file === 'undefined')

  file = result.files['styledown/figure.js']
  t.true(typeof file === 'undefined')

  file = result.files['styledown/figure.js']
  t.true(typeof file === 'undefined')
})

test('frames', t => {
  const result = build(FILES)
  let header, file, part

  file = result.files['components.html']
  // console.log('file:', require('util').inspect(file, { depth: null, colors: true }))
  t.true(file.title === 'Components')

  header = file.sections[0]
  t.true(header.title === 'Components')
  t.true(header.depth === 1)
  t.true(header.id === 'components')

  header = file.sections[1]
  t.true(header.title === 'header')
  t.true(header.depth === 3)
  t.true(header.id === 'header')

  part = header.parts[0]
  t.true(part.id === 'header-1')
  t.true(part.type === 'text')
  t.true(part.content === '<p>This is a header</p>')

  part = header.parts[1]
  t.true(part.id === 'header-2')
  t.true(part.type === 'example')
  t.true(part.language === 'haml')
  t.true(part.source === "= render 'header'")
  t.true(part.content === undefined)
  t.true(part.frameSrc === 'examples/components/header-2.html')

  file = result.files['examples/components/header-2.html']
  // console.log('file:', require('util').inspect(file, { depth: null, colors: true }))
  t.true(file.type === 'text/html')
  t.true(file.layout === 'figure')

  // part = file.part
  t.true(file.content === '= render \'header\'')
  t.true(file.source === undefined)
  t.true(file.language === 'haml')
})
