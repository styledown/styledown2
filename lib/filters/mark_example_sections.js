const forEach = require('object-loops/for-each')

/**
 * Marks sections with examples
 *
 *     data = {
 *       files: {
 *         'buttons.html': {
 *           sections: [ ... ] } } }
 *
 *     markExampleSections(data)
 *     data.files['buttons.html'].sections{0].class == ' -literate-style'
 */

function markExampleSections (data) {
  forEach(data.files, (file, filename) => {
    if (file.sections) {
      forEach(file.sections, section => {
        if (!section.parts) return

        const hasExample = section.parts.some(p =>
          p.isExample && !isWide(p))

        if (hasExample) {
          section.class += ' -literate-style'
        }
      })
    }
  })

  return data
}

function isWide (part) {
  const className = part.class || ''
  return className.indexOf('-full') !== -1 ||
    className.indexOf('-wide') !== -1
}

/*
 * Export
 */

module.exports = markExampleSections
