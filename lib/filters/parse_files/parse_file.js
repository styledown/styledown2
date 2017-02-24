/*
 * Options for markdown-it
 * https://www.npmjs.com/package/markdown-it#init-with-presets-and-options
 */

const MARKDOWN_OPTIONS = {
  html: true
}

/**
 * Parses a file.
 * @private
 *
 *     contents = '# Buttons\n\n### btn\nThis is a button'
 *     parse(contents, { source: 'buttons.md', filename: 'buttons.html' })
 *     => { 'buttons.html':
 *          { source: 'buttons.md',
 *            title: 'Buttons',
 *            sections: [
 *              { id: 'btn' ... } ] } }
 */

module.exports = function parse (data, { source, filename }) {
  let md = require('markdown-it')(MARKDOWN_OPTIONS)
    .use(require('markdown-it-named-headings'))
  let env = {}
  let file = { source, title: null, sections: [] }
  let result = { [filename]: file }

  var tokens = [].concat(md.parse(data, env))
  eatDocument(md, tokens, file)
  return result
}

/*
 * document := section, ...
 *
 * A lot of these eat* functions have the signature of `(md, tokens, out)`.
 *
 * - `md` - markdown-it parser instance
 * - `tokens` - (mutated) tokens to be parsed. It will be shift()'ed
 * - `out` - (mutated) final output.
 */

function eatDocument (md, tokens, out) {
  eatPrelude(md, tokens, out)

  while (tokens.length > 0) {
    eatSection(md, tokens, out)
  }
  return true
}

/*
 * Eat tokens that are before a heading
 */

function eatPrelude (md, tokens, out) {
  const preludeTokens = eatNonHeadings(md, tokens)
  if (!preludeTokens.length) return

  const html = md.renderer.render(preludeTokens, md.options).trim()
  out.sections.push({
    id: '_prelude',
    hasHeading: false,
    depth: 0,
    class: '',
    parts: [{
      id: '_prelude-text',
      type: 'text',
      isText: true,
      content: html
    }]
  })
}

function eatNonHeadings (md, tokens, out = []) {
  if (!tokens.length) return out

  const token = tokens[0]
  if (isSectionHeading(token)) return out

  out.push(tokens.shift())
  return eatNonHeadings(md, tokens, out)
}

/*
 * section := heading, ?
 */

function eatSection (md, tokens, out) {
  var left = []
  var section = {
    id: null,
    title: null,
    depth: null,
    class: '',
    parts: []
  }

  eatH1(md, tokens, out)
  if (!eatHeading(md, tokens, out, section)) return

  while (tokens.length) {
    if (eatSection(md, tokens, out)) {
      return close()
    }
    left.push(tokens.shift())
  }

  return close()

  function close () {
    return eatSectionParts(md, left, section)
  }
}

function eatSectionParts (md, tokens, section) {
  var left = []

  while (tokens.length) {
    var token = tokens[0]
    if (token.type === 'fence') {
      procSectionText(md, left, section)
      eatSectionFence(md, tokens, section)
      left = []
    } else {
      left.push(tokens.shift())
    }
  }

  procSectionText(md, left, section)
  return true
}

function procSectionText (md, tokens, section) {
  if (tokens.length === 0) return
  const id = '' + section.id + '-' + (section.parts.length + 1)

  section.parts.push({
    id: id,
    type: 'text',
    isText: true,
    content: md.renderer.render(tokens, md.options).trim()
  })

  return true
}

function eatSectionFence (md, tokens, section) {
  const id = '' + section.id + '-' + (section.parts.length + 1)
  const example = parseExampleInfo(tokens[0].info.trim())
  const content = tokens[0].content.trim()

  if (example) {
    section.parts.push({
      id: id,
      type: 'example',
      isExample: true,
      language: example.language,
      class: example.class,
      content: content,
      source: content /* will be overridden */
    })
  } else {
    const lang = tokens[0].info.trim()
    section.parts.push({
      id: id,
      type: 'code',
      isCode: true,
      language: lang,
      content: content
    })
  }

  tokens.shift()
  return true
}

/**
 * Parses example info.
 * @returns {Object} the result as `{ language, class }` (both strings).
 * @private
 *
 *     parseExampleInfo(example.jade.-clear.-full)
 *     => { language: 'jade', class: '-clear -full')
 */

function parseExampleInfo (str) {
  var m = str.match(/^example\.([^\.]+)((?:\.[^\.]+)*)$/)
  if (m) {
    return {
      language: m[1],
      class: (m[2] || '.').substr(1).split('.').join(' ')
    }
  }
}

/*
 * sets out.title
 */

function eatH1 (md, tokens, out) {
  var token = tokens[0]
  if (!token) return false
  if (token.type !== 'heading_open' || token.tag !== 'h1') return false

  var txt = md.renderer.render(tokens[1].children, md.options)
  out.title = txt
  return true
}

/*
 * heading := Token 'heading_open', Token 'inline', Token 'heading_close'
 */

function eatHeading (md, tokens, out, section) {
  var token = tokens[0]
  if (!token) return false
  if (!isSectionHeading(token)) return false

  var txt = md.renderer.render(tokens[1].children)
  var id = getAttr(token, 'id')
  section.id = id
  section.title = txt
  section.depth = +token.tag.substr(1) // 'h2' => 2
  section.hasHeading = true

  out.sections.push(section)
  tokens.shift()
  tokens.shift()
  tokens.shift()
  return true
}

function isSectionHeading (token) {
  return token.type === 'heading_open' &&
    ['h1', 'h2', 'h3'].indexOf(token.tag) !== -1
}

function getAttr (token, attrName) {
  var attrs = token.attrs || []
  for (var i = 0, len = attrs.length; i < len; i++) {
    var attr = attrs[i]
    if (attr[0] === attrName) return attr[1]
  }

  throw new Error('Styledown.parse: no ID for heading')
}
