var test = require('ava')
var styledown = require('../index')
var r = require('redent')

test('parseFiles', async t => {
  var out = await styledown.parseFiles([
    'examples/bootstrap/forms.md',
    'examples/bootstrap/components.md'
  ])

  t.true(out.files['examples/bootstrap/forms.md'].title === 'Forms')
  t.true(out.files['examples/bootstrap/components.md'].title === 'Components')
})

test('parseFiles failure', async t => {
  try {
    var out = await styledown.parseFiles([ 'xxx.xxx' ])
  } catch (e) {
    t.regex(e.message, /ENOENT: no such file or directory/)
  }
})

