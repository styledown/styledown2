# API phases

Processing a Styledown project happens in 3 parts: `read`, `build`, and `render`. This is a pipeline like so:

```js
files  = styledown.read('path/to/files')
data   = styledown.build(files)
output = styledown.render(data)
```

## Reading

[styledown.read()] reads raw contents of files into an Object.

```js
files = styledown.read('./docs/styleguides')
// => { 'buttons.md', 'forms.md', 'README.md' }
```

<details>
<summary>**Full result**</summary>

```js
{
  'buttons.md': { contents: '...' },
  'forms.md': { contents: '...' },
  'README.md': { contents: '...' }
}
```
</details>

## Building

[styledown.build()] processes the file contents and gives you 3 things:

- **files** — Styledown parses Markdown data and turns them into Objects that can be fed into mustache templates.
- **templates** — Mustache templates these are given by a theme.
- **meta** — Common data in all pages. These are taken from options and `styledown.json`.

```js
data = styledown.build(files)
// => { files, templates, meta }
```

<details>
<summary>**Full result**</summary>

```js
{
  files: {
    'buttons.html': {
      // These get fed into the 'html' template as data
      title: 'Buttons',
      layout: 'html',
      sections: [ /* ... */ ]
    },

    'forms.html': {
      /* ... */
    }
  },

  templates: {
    'html':
      `<!doctype html>
      <html>
        <title>{{title}}</title>
        {{> sidebar}}
        {{> body}}
      </html>`,

     'sidebar':
       `<div class='styleguide-menu'>...</div>`,

     'body':
       `<div class='styleguide-body'>{{#sections}}...{{/sections}}</div>`,
  },

  meta: {
    head: '<link rel="stylesheet" href="bootstrap.css">'
  }
}
```
</details>

## Rendering

[styledown.render()] combines the templates (`templates`) and the file data (`files` and `meta`) into files. The result is an Object that follows the same schema as [styledown.read()].

```js
output = styledown.render(data)
// => { 'buttons.html',
//      'forms.html',
//      'styledown/script.js',
//      'styledown.style.js' }
```

<details>
<summary>**Full result**</summary>

```js
/* Result: */
{
  'buttons.html': {
    contents: '<!doctype html>...</html>',
    type: 'text/html'
  },
  'forms.html': {
    contents: '<!doctype html>...</html>',
    type: 'text/html'
  },
  'styledown/script.js': {
    contents: '...',
    type: 'application/javascript'
  },
  'styledown/style.js': {
    contents: '...',
    type: 'text/css'
  }
}
```
</details>

[styledown.read()]: api.md#read
[styledown.build()]: api.md#build
[styledown.render()]: api.md#render

## Rationale

Styledown is meant to be integrated into many frameworks in many programming languages. There are (will be) bindings for Rails/Ruby and Phoenix/Elixir.

- __POJOs:__ Styledown works with plain JavaScript objects and arrays. This makes things easier to understand, and increases inter-operability with other languages.

- __File-system agnostic:__ The `read` can be done outside JavaScript (ie, reimplemented in another language). This lets other implementations do their own logic of reading files.

- __Extensible:__ By separating build and render phases, you're free to modify data given by `build()` as you see fit. This is useful for, for example, rendering example code using the Rails pipeline.
