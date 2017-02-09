const reduce = require('object-loops/reduce')

/**
 * Builder
 */

function build (data) {
  const { files, toc } = data

  const newFiles = reduce(files, (result, file) => {
    const outname = file.name.replace(/\.md$/, '.html')

    result[outname] = {
      id: outname,
      source: file.name,
      sections: {
        sidebar: '...',
        menu: '...',
        body: '...'
      }
    }

    return result
  }, {})

  return {
    files: newFiles
  }
}

 module.exports = build
