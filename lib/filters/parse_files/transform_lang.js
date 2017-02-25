var forEach = require('object-loops/for-each')
var jstEngine = require('../../helpers/jst_engine')

/**
 * Transform languages in example files
 * @private
 */

function transformLang (files, options) {
  forEach(files, (file, filename) => {
    if (file.layout === 'figure') transformLangFile(file, options)
  })

  return files
}

/**
 * Takes `part`, which is a file in build()'s output, and performs
 * language transformations.
 * @private
 * @example
 *
 *     result = transformLangFile({
 *       language: 'jade', content: 'a.btn Hello'
 *     }, { transform: ['jade'] })
 *
 *     result.language == 'html'
 *     result.sourceLanguage == 'jade'
 *
 *     result.source == 'a.btn Hello'
 *     result.content == '<a class="btn">Hello</a>'
 */

function transformLangFile (part, options) {
  var langs = options && options.transform
  if (!Array.isArray(langs)) return

  if (part.layout === 'figure' && langs.indexOf(part.language) > -1) {
    part.source = part.content
    part.content = transform(part.content, part.language)
    part.sourceLanguage = part.language
    part.language = 'html'
  }

  return part
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
