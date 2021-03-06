Forms
=====

### Controls
#### `.form-control`

Add this class to inputs, textareas, or anything else.

```example.jade
p: input.form-control(placeholder='Your name')
p: textarea.form-control(placeholder='Enter your message')
```

### Form group
#### `.form-group`

Individual form controls automatically receive some global
styling. All textual `<input>`, `<textarea>`, and `<select>` elements
with `.form-control` are set to `width: 100%;` by default. Wrap
labels and controls in .form-group for optimum spacing.

```example.jade
.form-group
  label Email address
  input.form-control(placeholder='hi@gmail.com')
.form-group
  label Password
  input.form-control(type='password' placeholder='Password')
```

### Inline form
#### `.form-inline`

Great for forms that only occupy one line for whatever reason. In screens 768px wide and below (tablets), form elements will stack vertically.

```example.jade.-lg
form.form-inline
  .form-group
    .input-group
      .input-group-addon @
      input.form-control(placeholder='Email')
  .form-group
    input.form-control(placeholder='Password' type='password')
  button.btn.btn-default Sign in
```

### Horizontal form
#### `.form-horizontal`

Use Bootstrap's grid classes to align labels.

```example.jade.-md
form.form-horizontal
  .form-group
    label.col-sm-2.control-label Email
    .col-sm-10
      input.form-control(type='text' placeholder='hello@example.com')
  .form-group
    label.col-sm-2.control-label Password
    .col-sm-10
      input.form-control(type='password' placeholder='Secret')
```

### Input group
#### `.input-group`

Extend form controls by adding text or buttons before, after, or on both sides
of any text-based input. Use `.input-group` with an `.input-group-addon` to
prepend or append elements to a single `.form-control`.

```example.jade.-slim
.input-group
  .input-group-addon @
  input.form-control(placeholder='Username')
br
.input-group
  input.form-control(type='text')
  .input-group-addon .00
br
.input-group
  .input-group-addon $
  input.form-control(type='text')
  .input-group-addon .00
```
