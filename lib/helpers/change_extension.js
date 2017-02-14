/**
 * Changse the file extension
 * @private
 *
 *     changeExtension('index.html', '.js') => 'index.js'
 *     changeExtension('index.html#lol', '.js', { anchor: true }) => 'index.js#lol'
 */

function changeExtension (filename, extension, options = {}) {
  if (options.anchor && filename.indexOf('#') !== -1) {
    return filename.replace(/\.[^\.]+#/, extension + '#')
  }

  return filename.replace(/\.[^\.]+$/, '') + extension
}

module.exports = changeExtension
