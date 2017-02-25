/**
 * Adds CSS/JS.
 */

function addAssets (data) {
  if (data.meta.skipAssets) return data

  data.files['styledown/styleguide.js'] = {
    layout: 'styleguideJs', type: 'application/javascript'
  }

  data.files['styledown/styleguide.css'] = {
    layout: 'styleguideCss', type: 'text/css'
  }

  data.files['styledown/figure.js'] = {
    layout: 'figureJs', type: 'application/javascript'
  }

  data.files['styledown/figure.css'] = {
    layout: 'figureCss', type: 'text/css'
  }

  return data
}

module.exports = addAssets
