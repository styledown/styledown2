Buttons
=======

### Buttons
#### `.btn`

Applies to `<a>` and `<button>`.

```example.jade
a.btn.btn-primary Primary button
```

#### `&.btn-link`
**Link button** without any borders

```example.jade
a.btn.btn-link Link
```

#### `&.btn-xs`
#### `&.btn-sm`
#### `&.btn-lg`
**Sizes** - Define sizes using `btn-lg`, `btn-sm`, and `btn-xs` classes.

```example.jade
p
  a.btn.btn-lg.btn-primary Large
  a.btn.btn-lg.btn-default btn-lg
p
  a.btn.btn-primary Default
  a.btn.btn-default Default
p
  a.btn.btn-sm.btn-primary Small
  a.btn.btn-sm.btn-default btn-sm
p
  a.btn.btn-xs.btn-primary X-Small
  a.btn.btn-xs.btn-default btn-xs
```

#### `&.btn-default`
#### `&.btn-primary`
#### `&.btn-success`
#### `&.btn-info`
#### `&.btn-warning`
#### `&.btn-danger`
**Color variants**

```example.jade
a.btn.btn-default Default
a.btn.btn-primary Primary
a.btn.btn-success Success
a.btn.btn-info Info
a.btn.btn-warning Warning
a.btn.btn-danger Danger
```

### Button block
#### `&.btn-block`

Makes buttons occupy a full width (block).

```example.jade
.well.center-block(style='max-width: 400px')
  a.btn.btn-lg.btn-block.btn-primary Block level button
  a.btn.btn-lg.btn-block.btn-default .btn-block
```

### Button group
#### `.btn-group`

Wraps a series of buttons in a group.

```example.jade
.btn-group
  button.btn.btn-default Left
  button.btn.btn-default Middle
  button.btn.btn-default Right
```

### Toolbar
#### `.btn-toolbar`

Wraps a series of button groups in a toolbar for more complex components.

```example.jade
.btn-toolbar
  .btn-group
    button.btn.btn-default Cut
    button.btn.btn-default Copy
    button.btn.btn-default Paste
  .btn-group
    button.btn.btn-default Undo
    button.btn.btn-default Redo
```
