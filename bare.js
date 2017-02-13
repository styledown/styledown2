/*
 * Bare export for other languages.
 *
 * This is a simplified distribution of Styledown without `styledown.read` and
 * other Node.js-specific things. It will be a distribution that would work in
 * the browser, Ruby's execjs, and other JavaScript interpreters.
 *
 * This is used by the Ruby gem (styledown2-source).
 */

require('babel-polyfill')

exports.cache = require('./lib/cache')
exports.render = require('./lib/render')
exports.build = require('./lib/build')
exports.templates = require('./lib/templates')
exports.version = require('./package.json').version
