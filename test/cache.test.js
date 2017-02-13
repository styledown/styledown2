const test = require('ava')
const fetch = require('../lib/cache').fetch

test('fetch() is defined', t => {
  t.is(typeof fetch, 'function')
})

test('fetch() works', t => {
  let i = 0
  fetch(['testkey'], () => ++i)
  fetch(['testkey'], () => ++i)

  const result = fetch(['testkey'], () => ++i)

  t.is(result, 1)
})
