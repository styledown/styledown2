var jstEngine = require('./helpers/jst_engine')

function render (templates, filename, options = {}) {
  const file = templates.files[filename]
  if (!file) throw new Error(`render(): can't find file ${filename}`)

  // For css and js
  if (file.contents) return file.contents

  if (options.layout) {
    var layout = jstEngine(options.layoutEngine || 'ejs')
      .compile(options.layout).fn

    return layout(templates.files[filename])
  } else {
    return file.sections.body
  }
}

module.exports = render
