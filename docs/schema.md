Output schema
=============

Given this input:

    # Components

    ### Top header
    This is the main header partial.

    ``` example.haml
    = render 'components/top_header'
    ```

## Sample output

You can compile the above using:

```
styledown components.md --data
```

```js
build(read('path/to/components.md'))
```

You'll get this JSON output:

```json
{ "files":
  { "components.md":
    { "title": "Components",
      "name": "components.md",
      "sections":
        [ { "id": "components",
            "title": "Components",
            "depth": 1 },
          { "id": "top-header",
            "title": "Top header",
            "depth": 3,
            "parts":
            [ { "type": "text",
                "language": "html",
                "content": "<p>This is the main header partial.</p>" },
              { "type": "example",
                "language": "haml",
                "content": "= render 'components/top_header'" } ] } ] } },
  "toc": { ...  } }
```

### Composition

It breaks down like so:

- A styleguide has many [Files](#files).
- A file has many [Sections](#sections).
- A section has many [Parts](#parts).

## Files

> `files`

`files` is a Dictionary where the key is the filename (eg, _'components.md'_) and the value is the file.
A file has the following fields:

- `name` - The filename
- `title` - The title, taken from the first *H1* elemnet.
- `sections` - a Dictionary

## Sections

> `files.*.sections`

`sections` is an array of section details. A section starts from a H1, H2, or H3 heading, followed the other blocks that follow it.

- `id`
- `title` - The title, taken from the *H2* or *H3* element that started the section.
- `depth` - _1_, _2_ or _3_.
- `parts` - a Dictionary

## Parts

> `files.*.sections[].parts`

`parts` is an array of part details.

- `id`
- `type` - Can be _'example'_, _'text'_, or _'code'_.
- `isExample` - true if type is 'example'.
- `isText` - true if type is 'text'.
- `isCode` - true if type is 'code'.
- `language` - Language that 'source' is written in (eg, 'html'). ?
- `content` - The figure's HTML.
- `source` - The source code.

## Table of Contents

A table of contents will be generated when one of the files is called `README.md`. It looks like this:

```js
{ sections:
   [ { title: 'Home',
       source: 'index.md',
       url: 'index.html' },
     { title: 'Document',
       sections:
        [ { title: 'Index',
            source: 'index.md',
            url: 'index.html' } ] } ] }
```
