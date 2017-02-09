const reduce = require('object-loops/reduce')
const render = require('./build/render')

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
        menu: render.menu(data, file.name),
        sidebar: render.sidebar(data, file.name),
        body: render.body(data, file.name)
      }
    }

    return result
  }, {})

  return {
    files: newFiles
  }
}

 module.exports = build
