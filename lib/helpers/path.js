/**
 * Works like `path.dirname` but only works on slash-delimited paths.
 * @private
 * @example
 *
 *     dirname('a/b')     => 'a'
 *     dirname('btn.html') => ''
 */

// TODO test path.dirname()
function dirname (filename) {
  if (filename.indexOf('/') === -1) return ''
  return filename.replace(/\/[^\/]*$/, '')
}

/**
 * Works like `path.join` but only works on slash-delimited paths.
 * @private
 * @example
 */

// TODO test path.join()
function join () {
  var args = [].slice.call(arguments)
  return args.filter(Boolean).join('/')
}

exports.dirname = dirname
exports.join = join
