var each = require('../helpers/each')
var jstEngine = require('../helpers/jst_engine')

/**
 * Takes `data`, which is a file in build()'s output, and performs
 * language transformations.
 * @private
 * @example
 *
 *     result = transformLang({
 *       sections: [
 *         { parts: [
 *           { type: 'example', language: 'jade', content: 'a.btn Hello' }
 *         ] }
 *       ]
 *     }, { transform: ['jade'] })
 *
 *     result.sections[0].parts[0].language == 'html'
 *     result.sections[0].parts[0].sourceLanguage == 'jade'
 *
 *     result.sections[0].parts[0].source == 'a.btn Hello'
 *     result.sections[0].parts[0].content == '<a class="btn">Hello</a>'
 */

function transformLang (data, options) {
  var langs = options && options.transform
  if (!Array.isArray(langs)) return

  each(data.sections, function (section) {
    each(section.parts, function (part) {
      if (part.type === 'example' && langs.indexOf(part.language) > -1) {
        part.source = part.content
        part.content = transform(part.content, part.language)
        part.sourceLanguage = part.language
        part.language = 'html'
      }
    })
  })

  return data
}

/**
 * Transforms `input` as a language `lang` via jstransformer.
 * @private
 * @example
 *
 *     transform('.hello world', 'jade')
 *     => '<div class="hello">world</div>'
 */

function transform (input, lang) {
  var engine = jstEngine(lang)
  return engine.render(input).body
}

/*
 * Export
 */

module.exports = transformLang
