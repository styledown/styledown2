var test = require('ava')
var render = require('../../lib/render/render_template')
var templates = require('../../lib/templates')
var normalize = require('../../support/normalize')

test('renders templates', t => {
  const data = {
    title: 'Hello',
    sections: [
      {
        depth: 2,
        id: 'btn',
        title: 'Buttons',
        hasHeading: true,
        parts: [
          { id: 'part',
            isText: true,
            content: 'These are buttons' }
      ] }
    ]
  }

  const html = render(data, templates, 'styleguide')

  t.true(normalize(html).indexOf(normalize(`
    <title>Hello</title>
  `)) !== -1)

  t.true(normalize(html).indexOf("styleguide-menu") !== -1)

  t.true(normalize(html).indexOf(normalize(`
    <section class='styleguide-section -h2'>
    <h2 id='btn'>Buttons</h2>
    <div class='styleguide-text'>These are buttons</div></section>
  `)) !== -1)
})
