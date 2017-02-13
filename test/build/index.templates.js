const test = require('ava')
const build = require('../../lib/build')
const dedent = require('dedent')

const CSS = "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' />"

const FILES = {
  'components.md': {
    contents: dedent `
      # Components
      ### header
      This is a header

      ~~~ example.haml
      = render 'header'
      ~~~`
  },
  'templates/sidebar.html': {
    contents: ':)'
  },
  'templates/head.html': {
    contents: dedent `
      {{{inherit}}}
      ${CSS}`
  }
}

test('replacing templates', t => {
  const result = build(FILES)
  const templates = result.templates

  t.true(templates.sidebar === ':)')
})

test('inheriting templates', t => {
  const result = build(FILES)
  const templates = result.templates

  const head = templates.head

  t.true(head.indexOf(CSS) !== -1)
  t.true(head.split(CSS).length === 2)
})
