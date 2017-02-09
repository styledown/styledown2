const reduce = require('object-loops').reduce

/**
 * Builder
 */

function build (data) {
  const { files, toc } = data

  const newFiles = reduce(files, (result, file) => {
    const fname = file.name
    result[fname]
    return result
  }, {})

  return {
    files: newFiles
  }
}

 module.exports = build
