const map = require('object-loops/map')
const { h } = require('preact')
const render = require('preact-render-to-string')

const Menu = require('../views/menu')
const Body = require('../views/body')
const Sidebar = require('../views/sidebar')
const Section = require('../views/section')

/*
 * Renders a file.
 */

function renderBody (data, filename) {
  var fileData = data.files[filename]
  if (!fileData) throw new Error("No data for file '" + file + "'")

  return render(<Body sections={fileData.sections} />)
}


function renderMenu (data, filename) {
  return render(<Menu toc={data.toc} active={filename} />)
}

function renderSidebar (data, filename) {
  return render(<Sidebar toc={data.toc} active={filename} />)
}

exports.body = renderBody
exports.menu = renderMenu
exports.sidebar = renderSidebar
