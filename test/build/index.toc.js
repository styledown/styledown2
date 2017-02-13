const test = require('ava')
const build = require('../../lib/build')
const dedent = require('dedent')
const tocify = require('../../lib/tocify')

test('generates toc', t => {
  var output = build({
    'README.md': {
      contents: dedent `
        # Table of Contents

        * [Buttons](buttons.md)
        * [Panels](panels.md)
      ` },
    'buttons.md': { contents: '# Buttons' },
    'panels.md': { contents: '# Panels' }
  })

  var expected =
    { toc:
       { sections:
          [ { title: 'Buttons',
              href: 'buttons.html',
              depth: 1,
              isParent: false },
            { title: 'Panels',
              href: 'panels.html',
              depth: 1,
              isParent: false } ],
         depth: 0,
         isParent: true } }

  t.deepEqual(output.toc, expected.toc)
})

test('tocify()', t => {
  var output = tocify(dedent `
    # Table of Contents

    * [Home](index.md)
    * Document
      * [Index](index.md)
  `)

  var expected =
    { sections:
       [ { title: 'Home',
           href: 'index.html',
           isParent: false,
           depth: 1 },
         { title: 'Document',
           sections:
            [ { title: 'Index',
                href: 'index.html',
                isParent: false,
                depth: 2 } ],
           isParent: true,
           depth: 1 } ],
      depth: 0,
      isParent: true }

  t.deepEqual(output, expected)
})

test('anchors', t => {
  var output = build({
    'README.md': {
      contents: '* [Buttons](buttons.md#lol)'
    }
  })

  const section = output.toc.sections[0]
  t.deepEqual(section.href, 'buttons.html#lol')
})

test('custom extensions', t => {
  var output = build({
    'README.md': {
      contents: '* [Buttons](buttons.md#lol)'
    }
  }, { extension: '.htm' })

  const section = output.toc.sections[0]
  t.deepEqual(section.href, 'buttons.htm#lol')
})
