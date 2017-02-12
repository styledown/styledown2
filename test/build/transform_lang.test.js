const test = require('ava')
const transformLang = require('../../lib/build/transform_lang')

test('transformLang: works', t => {
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
