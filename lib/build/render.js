var template = require('fs').readFileSync(__dirname + '/../../data/template.jade', 'utf-8')
var menuTemplate = require('fs').readFileSync(__dirname + '/../../data/menu.jade', 'utf-8')
var sidebarTemplate = require('fs').readFileSync(__dirname + '/../../data/sidebar.ejs', 'utf-8')
var jstEngine = require('../helpers/jst_engine')

/*
 * Renders a file.
 */

function renderBody (data, file) {
  var fn = jstEngine('jade').compile(template, { pretty: true }).fn

  var fileData = data.files[file]
  if (!file) throw new Error("No data for file '" + file + "'")
  var html = fn({ file: fileData })

  return html
}

/*
 * Renders the menu from the table of contents `toc`. `filename` is the
 * filename to be rendered.
 *
 *    var files = [ { name: 'forms.md', contents: '...' } ]
 *    var data = styledown.parse(files)
 *    styledown.render(data, 'forms.md', { section: 'menu' })
 */

function renderMenu (data, filename) {
  const { toc } = data
  var fn = jstEngine('jade').compile(menuTemplate, { pretty: true }).fn

  return fn({
    toc: toc,
    active: filename,
    base: '',
    extension: '.html'
  })
}

function renderSidebar (data, filename) {
  var fn = jstEngine('ejs').compile(sidebarTemplate).fn

  return fn({
    renderToc: () => renderMenu(data, filename)
  })
}

exports.body = renderBody
exports.menu = renderMenu
exports.sidebar = renderSidebar
