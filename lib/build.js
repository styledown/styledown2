const DEFAULTS = {
  extension: '.html'
}

/**
 * Parses files synchronously.
 *
 * @param {Object[]} files Files to be parsed. Each file has `{name, contents}`.
 * @param {string[]} options.transform Languages to be transformed
 * @param {string} options.extension Extension. Defaults to '.html'
 * @param {Boolean} options.skipAssets If true, skips JS/CSS
 * @returns {Object} raw data in the shape of `{files, toc}`.
 * @example
 *
 *     parse({
 *       'README.md': { contents: '...' },
 *     }, { transform: ['jade'] })
 */

function build (files, options = {}) {
  let result = {
    _input: files, // to be removed later
    files: {},
    templates: {},
    meta: Object.assign({}, DEFAULTS, options)
  }

  // Add `result.toc` to be picked up later
  require('./filters/add_toc')(result)

  // Add default templates in templates/index.js
  require('./filters/add_default_templates')(result)

  // Parse ._input into .files and .templates
  require('./filters/parse_files')(result)

  // Marks sections that contain examples with an extra class
  require('./filters/mark_example_sections')(result)

  // Add CSS/JS
  require('./filters/add_assets')(result)

  delete result._input
  return result
}

/*
 * Export
 */

module.exports = build
