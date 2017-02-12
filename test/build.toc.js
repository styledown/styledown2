const test = require('ava')
const build = require('../lib/build')
const dedent = require('dedent')
const tocify = require('../lib/tocify')

test('build: generates toc', t => {
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
              source: 'buttons.md',
              basename: 'buttons' },
            { title: 'Panels',
              source: 'panels.md',
              basename: 'panels' } ] } }

  t.deepEqual(output.toc, expected.toc)
})

test('build: tocify()', t => {
  var output = tocify(dedent `
    # Table of Contents

    * [Home](index.md)
    * Document
      * [Index](index.md)
  `)

  var expected =
    { sections:
       [ { title: 'Home',
           source: 'index.md',
           basename: 'index' },
         { title: 'Document',
           sections:
            [ { title: 'Index',
                source: 'index.md',
                basename: 'index' } ] } ] }

  t.deepEqual(output, expected)
})
