const test = require('ava')
const build = require('../../lib/build')
const dedent = require('dedent')

const CONTENTS = dedent `
  # Components
  ### header
  This is a header

  ~~~ example.jade
  .hello world
  ~~~`

const EXAMPLE_FILE = 'examples/components/header-2.html'

test('transforming jade', t => {
  let out = build({
    'components.html': { contents: CONTENTS }
  }, { transform: ['jade'] })

  let example = out.files[EXAMPLE_FILE]
  t.true(example.language === 'html')
  t.true(example.content === '<div class="hello">world</div>')
  t.true(example.source === '.hello world')
})

test('dont transform if not specified', t => {
  var out = build({
    'components.html': { contents: CONTENTS }
  })

  let example = out.files[EXAMPLE_FILE]
  t.true(example.language === 'jade')
  t.true(example.content === '.hello world')
})
