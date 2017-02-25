const test = require('ava')
const read = require('../../lib/read')

test('read: works on paths', t => {
  const result = read('./examples/bootstrap/src')

  t.deepEqual(Object.keys(result), [
    'README.md',
    'buttons.md',
    'components.md',
    'forms.md',
    'grid.md',
    'index.md',
    'tables.md',
    'templates/head.html',
    'templates/styleguideCss.css',
    'templates/title.html'
  ])

  t.is(typeof result['README.md'].contents, 'string')
})

test('read: works on paths', t => {
  const result = read('./examples/bootstrap/src/buttons.md')

  t.deepEqual(Object.keys(result), [
    'buttons.md'
  ])
})
