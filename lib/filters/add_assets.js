/**
 * Adds CSS/JS.
 */

function addAssets (data) {
  if (data.meta.skipAssets) return data

  data.files['styledown/script.js'] = {
    layout: 'script', type: 'application/javascript'
  }

  data.files['styledown/style.css'] = {
    layout: 'style', type: 'text/css'
  }

  return data
}

module.exports = addAssets
