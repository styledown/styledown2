const test = require('ava')
const cache = require('../lib/cache')

test('fetch() is defined', t => {
  t.is(typeof cache.fetch, 'function')
})

test('fetch() works', t => {
  let i = 0
  cache.fetch(['testkey'], () => ++i)
  cache.fetch(['testkey'], () => ++i)

  const result = cache.fetch(['testkey'], () => ++i)

  t.is(result, 1)
})
