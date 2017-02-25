const tocify = require('../tocify')

/**
 * Adds toc (table of contents)
 * @private
 */

function addToc (result) {
  const files = result._input

  if (files['README.md']) {
    result.toc = tocify(files['README.md'].contents, result.meta)
    delete files['README.md']
  }

  return result
}

/*
 * Export
 */

module.exports = addToc
