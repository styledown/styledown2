const forEach = require('object-loops/for-each')

/**
 * Adds `base` to every file
 */

function addBase (data) {
  forEach(data.files, (file, filename) => {
    file.base = Array(filename.split('/').length).join('../')
  })

  return data
}

module.exports = addBase
