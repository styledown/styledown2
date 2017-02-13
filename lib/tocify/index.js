var parseLink = require('./parse_link')
var assign = Object.assign
var slugify = require('../helpers/slugify')

/**
 * Builds a TOC.
 * @private
 */
function tocify (contents, options = {}) {
  let toc = buildToc(contents, options)
  toc = addDepth(toc)
  return toc
}

/**
 * Builds a TOC.
 * @private
 */

function buildToc (contents, options = {}) {
  const extension = options.extension || '.html'
  var md = require('markdown-it')()

  var m, tokens = md.parse(contents)
  while (tokens.length) {
    if (m = matchList(tokens, ulFunc, liFunc)) {
      return m.payload
    } else {
      tokens = tokens.slice(1)
    }
  }

  function ulFunc (payload) {
    return { sections: payload.items, isParent: true }
  }

  function liFunc (payload) {
    var res = parseLink(payload.inline.content)
    var m
    if (res.href) {
      res.href = res.href
        .replace('.md#', extension + '#')
        .replace(/\.md$/, extension)
    }
    if (payload.list) {
      res.sections = payload.list.sections
      res.isParent = true
    } else {
      res.isParent = false
    }
    return res
  }
}

/**
 * Adds a `depth` property to every item.
 * @private
 *
 *     const root = {
 *       title: 'hi',
 *       sections: [ { title: 'world' } ]
 *     }
 *
 *     addDepth(root)
 *     root === {
 *       title: 'hi', depth: 1,
 *       sections: [ { title: 'world', depth: 2 } ]
 *     }
 */

function addDepth (item, depth = 0) {
  item.depth = depth
  if (item.sections) {
    item.sections = item.sections.map(s => addDepth(s, depth + 1))
  }
  return item
}


/*
 * Matches a list. Used to take the tokens stream into an AST-like thing.
 *
 *     m = matchList(tokens)
 *     m.payload.items  // items (payloads from matchItem())
 *     m.tokens         // remaining tokens
 *
 * `liFunc` and `ulFunc` will be what will transform the payloads.
 */

function matchList (tokens, ulFunc, liFunc) {
  var m, open = tokens[0]
  if (!open || open.type !== 'bullet_list_open') return

  tokens = tokens.slice(1)
  var payload = { items: [] }

  if (!ulFunc) ulFunc = function (data) { return data }
  if (!liFunc) liFunc = function (data) { return data }

  while (tokens.length) {
    var t = tokens[0]
    if (!t) return

    if (m = matchItem(tokens, ulFunc, liFunc)) {
      payload.items.push(m.payload)
      tokens = m.tokens
    } else if (t.type === 'bullet_list_close') {
      return { tokens: tokens.slice(1), payload: ulFunc(payload) }
    } else {
      return
    }
  }
}

/*
 * Matches a list item
 *
 *     m = matchItem(tokens)
 *     m.payload.contents  // tokens
 *     m.payload.inline    // inline text token
 *     m.payload.list      // bullet list (payload from matchList())
 *     m.tokens
 */

function matchItem (tokens, ulFunc, liFunc) {
  var m, open = tokens[0]
  if (!open || open.type !== 'list_item_open') return

  tokens = tokens.slice(1)
  var payload = { contents: [] }

  while (tokens.length) {
    var t = tokens[0]
    if (!t) return

    if (m = matchList(tokens, ulFunc, liFunc)) {
      payload.list = m.payload
      tokens = m.tokens
    } else if (m = matchItem(tokens, ulFunc, liFunc)) {
      tokens = m.tokens
    } else if (t.type === 'inline') {
      payload.inline = t
      tokens = tokens.slice(1)
    } else if (t.type === 'list_item_close') {
      return {
        tokens: tokens.slice(1),
        payload: liFunc(payload)
      }
    } else {
      payload.contents.push(t)
      tokens = tokens.slice(1)
    }
  }
}

/*
 * Export
 */

module.exports = tocify
