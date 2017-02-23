const test = require('ava')
const transformLang = require('../../../lib/filters/parse_files/transform_lang')

test('works', t => {
  const result = transformLang({
    sections: [
      { parts: [
        { type: 'example', language: 'jade', content: 'a.btn Hello' }
      ] }
    ]
  }, { transform: ['jade'] })

  t.is(result.sections[0].parts[0].language, 'html')
  t.is(result.sections[0].parts[0].sourceLanguage, 'jade')
  t.is(result.sections[0].parts[0].source, 'a.btn Hello')
  t.is(result.sections[0].parts[0].content, '<a class="btn">Hello</a>')
})

test('leaves others alone', t => {
  const result = transformLang({
    sections: [
      { parts: [
        { type: 'example', language: 'haml', content: '%a.btn Hello' }
      ] }
    ]
  }, { transform: ['jade'] })

  t.is(result.sections[0].parts[0].language, 'haml')
  t.is(result.sections[0].parts[0].sourceLanguage, undefined)
  t.is(result.sections[0].parts[0].content, '%a.btn Hello')
})

test('works with pug', t => {
  const result = transformLang({
    sections: [
      { parts: [
        { type: 'example', language: 'pug', content: 'a.btn Hello' }
      ] }
    ]
  }, { transform: ['pug'] })

  t.is(result.sections[0].parts[0].language, 'html')
  t.is(result.sections[0].parts[0].sourceLanguage, 'pug')
  t.is(result.sections[0].parts[0].source, 'a.btn Hello')
  t.is(result.sections[0].parts[0].content, '<a class="btn">Hello</a>')
})
