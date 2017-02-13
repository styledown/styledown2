const test = require('ava')
const render = require('../../lib/render')

test('works', t => {
  const data = {
    files: {
      'buttons.html': { name: 'John', layout: 'html', type: 'text/html' }
    },
    templates: {
      'html': 'Hello {{name}}'
    }
  }

  const result = render(data)

  t.deepEqual(Object.keys(result), ['buttons.html'])
  t.deepEqual(Object.keys(result['buttons.html']), ['contents', 'type'])
  t.deepEqual(result['buttons.html'].contents, 'Hello John')
  t.deepEqual(result['buttons.html'].type, 'text/html')
})

test('works without type', t => {
  const data = {
    files: {
      'buttons.html': { name: 'John', layout: 'html' }
    },
    templates: {
      'html': 'Hello {{name}}'
    }
  }

  const result = render(data)
  t.deepEqual(result['buttons.html'].type, undefined)
})

test('works without layout', t => {
  const data = {
    files: {
      'buttons.html': { name: 'John' }
    }
  }

  const result = render(data)
  t.deepEqual(result['buttons.html'], { contents: '', type: undefined })
})

test('accounts for meta', t => {
  const data = {
    files: {
      'buttons.html': { layout: 'html' }
    },
    templates: { 'html': 'Hello {{meta.name}}' },
    meta: { name: 'John' }
  }

  const result = render(data)

  t.deepEqual(Object.keys(result), ['buttons.html'])
  t.deepEqual(Object.keys(result['buttons.html']), ['contents', 'type'])
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
