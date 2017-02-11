var test = require('ava')
var render = require('../lib/render')
var r = require('redent')

test('render: variables', t => {
  const html = render({ name: 'world' }, { html: 'hello {{name}}' })
  t.deepEqual(html, 'hello world')
})

test('render: partials', t => {
  const html = render({ name: 'world' }, {
    html: '<div>{{> msg}}</div>',
    msg: 'hello {{name}}'
  })
  t.deepEqual(html, '<div>hello world</div>')
})
