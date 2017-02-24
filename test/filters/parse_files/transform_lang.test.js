const test = require('ava')
const transformLang = require('../../../lib/filters/parse_files/transform_lang')

const EXAMPLE_NAME = 'examples/foo.html'

test('works', t => {
  const result = transformLang({
    [EXAMPLE_NAME]: {
      layout: 'figure',
      type: 'example',
      language: 'jade',
      content: 'a.btn Hello'
    }
  }, { transform: ['jade'] })

  const file = result[EXAMPLE_NAME]
  t.is(file.language, 'html')
  t.is(file.sourceLanguage, 'jade')
  t.is(file.source, 'a.btn Hello')
  t.is(file.content, '<a class="btn">Hello</a>')
})

test('leaves others alone', t => {
  const result = transformLang({
    [EXAMPLE_NAME]: {
      layout: 'figure',
      type: 'example',
      language: 'haml',
      content: '%a.btn Hello'
    }
  }, { transform: ['jade'] })

  const file = result[EXAMPLE_NAME]
  t.is(file.language, 'haml')
  t.is(file.sourceLanguage, undefined)
  t.is(file.content, '%a.btn Hello')
})

test('works with pug', t => {
  const result = transformLang({
    [EXAMPLE_NAME]: {
      layout: 'figure',
      type: 'example',
      language: 'pug',
      content: 'a.btn Hello'
    }
  }, { transform: ['pug'] })

  const file = result[EXAMPLE_NAME]
  t.is(file.language, 'html')
  t.is(file.sourceLanguage, 'pug')
  t.is(file.source, 'a.btn Hello')
  t.is(file.content, '<a class="btn">Hello</a>')
})
