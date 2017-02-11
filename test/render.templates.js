var test = require('ava')
var render = require('../lib/render')
var templates = require('../lib/templates')
var normalize = require('../support/normalize')

test('render/templates: templates', t => {
  const data = {
    sections: [
      {
        depth: 2,
        id: 'btn',
        title: 'Buttons',
        parts: [
          { id: 'part',
            isText: true,
            content: 'These are buttons' }
      ] }
    ]
  }

  const html = render(data, templates)

  t.true(normalize(html).indexOf(normalize(`
    <div class='styleguide-menu'>
    </div>
  `)) !== -1)

  t.true(normalize(html).indexOf(normalize(`
    <section class='styleguide-section -h2'>
    <h2 id='btn'>Buttons</h2>
    <div class='styleguide-text'>These are buttons</div></section>
  `)) !== -1)
})
