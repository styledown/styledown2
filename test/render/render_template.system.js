var test = require('ava')
var render = require('../../lib/render/render_template')
var r = require('redent')

test('variables', t => {
  const html = render(
    { name: 'world' },
    { html: 'hello {{name}}' },
    'html')

  t.deepEqual(html, 'hello world')
})

test('partials', t => {
  const html = render({
    name: 'world'
  }, {
    html: '<div>{{> msg}}</div>',
    msg: 'hello {{name}}'
  }, 'html')

  t.deepEqual(html, '<div>hello world</div>')
})

test('recursive partials', t => {
  const html = render({
    user: { name: 'world' }
  }, {
    html: '<div>{{> msg}}</div>',
    msg: '{{#user}}{{> greeting}}{{/user}}',
    greeting: 'hello {{name}}'
  }, 'html')

  t.deepEqual(html, '<div>hello world</div>')
})
