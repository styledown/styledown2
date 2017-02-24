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

function parseFile (data, { source, filename, extension }) {
  const md = require('markdown-it')(MARKDOWN_OPTIONS)
    .use(require('markdown-it-named-headings'))
  const env = {}

  // The final file to be built
  const file = {
    type: 'text/html',
    layout: 'styleguide',
    source,
    title: null,
    sections: []
  }

  // Examples to be added
  const examples = {}

  // Context to be passed around
  const ctx = { file, examples, filename, extension }

  // Woot, let's go
  const tokens = [].concat(md.parse(data, env))
  eatDocument(md, tokens, ctx)

  return Object.assign({},
    { [filename]: file },
    examples)
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

function eatDocument (md, tokens, ctx) {
  eatPrelude(md, tokens, ctx)

  while (tokens.length > 0) {
    eatSection(md, tokens, ctx)
  }
  return true
}

/*
 * Eat tokens that are before a heading
 */

function eatPrelude (md, tokens, ctx) {
  const preludeTokens = eatNonHeadings(md, tokens)
  if (!preludeTokens.length) return

  const html = md.renderer.render(preludeTokens, md.options).trim()
  ctx.file.sections.push({
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

/**
 * Eats the tokens before any section headings.
 *
 *     eatNonHeadings(md, tokens)
 *     => [ token, token ... ]
 */

function eatNonHeadings (md, tokens, result = []) {
  if (!tokens.length) return result

  const token = tokens[0]
  if (isSectionHeading(token)) return result

  result.push(tokens.shift())
  return eatNonHeadings(md, tokens, result)
}

/*
 * section := heading, ?
 */

function eatSection (md, tokens, ctx) {
  var left = []
  var section = {
    id: null,
    title: null,
    depth: null,
    class: '',
    parts: []
  }

  eatH1(md, tokens, ctx)
  if (!eatHeading(md, tokens, section, ctx)) return

  while (tokens.length) {
    if (eatSection(md, tokens, ctx)) return close()
    left.push(tokens.shift())
  }

  return close()

  function close () {
    return eatSectionParts(md, left, section, ctx)
  }
}

function eatSectionParts (md, tokens, section, ctx) {
  var left = []

  while (tokens.length) {
    var token = tokens[0]
    if (token.type === 'fence') {
      procSectionText(md, left, section)
      eatSectionFence(md, tokens, section, ctx)
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

function eatSectionFence (md, tokens, section, ctx) {
  const id = '' + section.id + '-' + (section.parts.length + 1)
  const example = parseExampleInfo(tokens[0].info.trim())
  const content = tokens[0].content.trim()

  if (example) {
    const exampleName = getExampleName(ctx.filename, id, ctx.extension)

    section.parts.push({
      id: id,
      type: 'example',
      isExample: true,
      class: example.class,
      frameSrc: exampleName
    })

    ctx.examples[exampleName] = {
      type: 'text/html',
      layout: 'figure',
      language: example.language,
      content: content,
      source: content /* will be overridden */
    }
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

function getExampleName (filename, partId, extension) {
  // Strip extension if needed
  if (filename.substr(filename.length - extension.length) === extension) {
    filename = filename.substr(0, filename.length - extension.length)
  }

  return 'examples/' + filename + '/' + partId + extension
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

function eatH1 (md, tokens, ctx) {
  var token = tokens[0]
  if (!token) return false
  if (token.type !== 'heading_open' || token.tag !== 'h1') return false

  var txt = md.renderer.render(tokens[1].children, md.options)
  ctx.file.title = txt
  return true
}

/*
 * heading := Token 'heading_open', Token 'inline', Token 'heading_close'
 */

function eatHeading (md, tokens, section, ctx) {
  var token = tokens[0]
  if (!token) return false
  if (!isSectionHeading(token)) return false

  var txt = md.renderer.render(tokens[1].children)
  var id = getAttr(token, 'id')
  section.id = id
  section.title = txt
  section.depth = +token.tag.substr(1) // 'h2' => 2
  section.hasHeading = true

  ctx.file.sections.push(section)
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

/*
 * Export
 */

module.exports = parseFile
