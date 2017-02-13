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
              href: 'buttons.md',
              depth: 1,
              isParent: false },
            { title: 'Panels',
              href: 'panels.md',
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
           href: 'index.md',
           isParent: false,
           depth: 1 },
         { title: 'Document',
           sections:
            [ { title: 'Index',
                href: 'index.md',
                isParent: false,
                depth: 2 } ],
           isParent: true,
           depth: 1 } ],
      depth: 0,
      isParent: true }

  t.deepEqual(output, expected)
})
