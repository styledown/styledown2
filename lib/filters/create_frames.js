const forEach = require('object-loops/for-each')
const dirname = require('../helpers/path').dirname
const join = require('../helpers/path').join

/**
 * Creates frame pages
 * @private
 */

// TODO test filters/create_frames - createFrames()
function createFrames (data) {
  const newFiles = {}

  forEach(data.files, (file, filename) => {
    if (!isStyleguide(file)) return

    forEach(file.sections, section => {
      forEach(section.parts, part => {
        if (!part.isExample) return

        createFrame({ file, filename, section, part, data })
      })
    })
  })

  return data
}

/**
 * Creates a frame page.
 * @private
 */

function createFrame ({ file, filename, section, part, data }) {
  const frameFilename = getFrameFilename(filename, part.id, data.meta.extension)

  const newFiles = {
    [frameFilename]: {
      type: 'text/html',
      layout: 'figure',
      part: part
    }
  }

  console.log('=> creating frame', newFiles)

  return { files: newFiles, filename: frameFilename }
}

function getFrameFilename (filename, partId, ext) {
  const ctx = dirname(filename)
  return join(ctx, 'examples', partId + ext)
}

/**
 * Checks if a given file is a styleguide.
 * @param {File} file A file.
 * @private
 * @example
 *
 *     isStyleguide(file)
 *     => true|false
 */

function isStyleguide (file) {
  return file.type === 'text/html' && file.layout === 'styleguide'
}

/*
 * Export
 */

module.exports = createFrames
