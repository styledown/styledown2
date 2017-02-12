const LRU = require('lru-cache')

/**
 * A last-recently-used cache (LRU). This is an
 * [lru-cache](https://npmjs.org/package/lru-cache) instance.
 */

const cache = LRU(process.env.STYLEDOWN_CACHE_SIZE || 1024)

/**
 * Gets-or-creates a key from the cache.
 */

function fetch (key, fn) {
  return fetchExact(JSON.stringify(key), fn)
}

/**
 * Gets-or-creates a key from the cache.
 */

function fetchExact (key, fn) {
  if (cache.has(key)) return cache.get(key)
  const result = fn()
  cache.set(key, result)
  return result
}

/*
 * Export
 */

module.exports = { cache, fetch, fetchExact }
