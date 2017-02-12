const LRU = require('lru-cache')

/**
 * A last-recently-used cache (LRU).
 * @example
 *
 *     cache.fetch('hello', () => {
 *       // expensive computation
 *     })
 */

const cache = LRU(process.env.STYLEDOWN_CACHE_SIZE || 1024)

/**
 * Gets-or-creates a key from the cache.
 */

cache.fetch = function (key, fn) {
  key = JSON.stringify(key)
  if (this.has(key)) return this.get(key)
  const result = fn()
  this.set(key, result)
  return result
}

/*
 * Export
 */

module.exports = cache
