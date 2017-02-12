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

test('build: transforming jade', t => {
  var out = build({
    'components.md': { contents: CONTENTS }
  }, { transform: ['jade'] })

  var example = out.files['components.md'].sections.header.parts.s2
  t.true(example.language === 'html')
  t.true(example.content === '<div class="hello">world</div>')
  t.true(example.source === '.hello world')
})

test('build: dont transform if not specified', t => {
  var out = build({
    'components.md': { contents: CONTENTS }
  })

  var example = out.files['components.md'].sections.header.parts.s2
  t.true(example.language === 'jade')
  t.true(example.content === '.hello world')
})
