const test = require('ava')
const render = require('../../lib/render')

test('works', t => {
  const data = {
    files: {
      'buttons.html': { name: 'John', layout: 'html' }
    },
    templates: {
      'html': 'Hello {{name}}'
    }
  }

  const result = render(data)

  t.deepEqual(Object.keys(result), ['buttons.html'])
  t.deepEqual(Object.keys(result['buttons.html']), ['contents'])
  t.deepEqual(result['buttons.html'].contents, 'Hello John')
})

test('allows recursive partials', t => {
  const data = {
    files: {
      'buttons.html': { name: 'John', layout: 'html' }
    },
    templates: {
      'html': '<div>{{> msg}}</div>',
      'msg': 'Hello {{name}}'
    }
  }

  const result = render(data)

  t.deepEqual(result['buttons.html'].contents, '<div>Hello John</div>')
})

test('throws errors when templates arent found', t => {
  const data = {
    files: {
      'buttons.html': { name: 'John', layout: 'nonexistent' }
    }
  }

  const error = t.throws(() => { render(data) }, Error)
  t.is(error.message, "render(): unknown template 'nonexistent'")
})
