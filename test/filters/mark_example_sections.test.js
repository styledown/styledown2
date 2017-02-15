const test = require('ava')
const markExampleSections = require('../../lib/filters/mark_example_sections')

function getInput () {
  return {
    files: {
      'buttons.html': {
        sections: [ {
          class: '',
          parts: [ {
            isExample: true,
          } ]
        }, {
          class: '',
          parts: [ {
            isExample: true,
            class: '-wide'
          } ]
        }, {
          class: '',
          parts: [ ]
        } ]
      }
    }
  }
}

test('works', t => {
  const result = markExampleSections(getInput())
  t.true(result.files['buttons.html'].sections[0].class === ' -literate-style')
  t.true(result.files['buttons.html'].sections[1].class === '')
  t.true(result.files['buttons.html'].sections[1].class === '')
})
