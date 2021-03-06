Components
==========

### Alert box
#### `.alert`
Provide contextual feedback messages for typical user actions
with the handful of available and flexible alert messages. For inline
dismissal, use the alerts jQuery plugin.

```example.jade
.alert.alert-success
  strong Well done!
  |  Things are going well. (alert-success)
.alert.alert-info
  strong Heads up!
  |  You're a wonderful person. (alert-info)
.alert.alert-warning
  strong Warning!
  |  Check the flux capacitor. (alert-warning)
.alert.alert-danger
  strong Danger!
  |  You must construct additional pylons. (alert-danger)
```

### List group
#### `ul.list-group`
Simple lists and elements using `.list-group` and `.list-group-item`.

```example.jade
ul.list-group
  li.list-group-item Apple
  li.list-group-item Orange
  li.list-group-item Banana
```

#### `>> span.badge`
Adds numeric badges.

```example.jade
ul.list-group
  li.list-group-item
    span.badge 23
    | Apple
  li.list-group-item
    span.badge 5
    | Orange
  li.list-group-item
    span.badge 2
    | Banana
```

### Pagination
#### `ul.pagination`

Simple pagination inspired by Rdio, great for apps and
search results. The large block is hard to miss, easily scalable, and
provides large click areas.

```example.jade
ul.pagination
  li
    a(href='#')!= "&laquo;"
  li
    a(href='#') 1
  li
    a(href='#') 2
  li
    a(href='#') 3
  li
    a(href='#') 4
  li
    a(href='#')!= "&raquo;"
```

### Pager
#### `ul.pager`
By default, it centers links.

```example.jade.padded
ul.pager
  li
    a Previous
  li
    a Next
```

### Label
#### `span.label`

Used for labelling things that need labels.

```example.jade
span.label.label-default Default
span.label.label-primary Primary
span.label.label-success Success
span.label.label-info Info
span.label.label-warning Warning
span.label.label-danger Danger
```

### Breadcrumbs
#### `ol.breadcrumb`

Indicate the current page's location within a navigational hierarchy.
Separators are automatically added in CSS through *:before* and *content*.

```example.jade
ol.breadcrumb
  li
    a Home
  li
    a Library
  li.active
    | Data
```

### Panel
#### `.panel`

Panels (`.panel`) are white boxes. `.panel-body` provides the padding.

```example.jade
.panel
  .panel-body Basic panel example
```

#### `> .panel-heading`
Add `.panel-heading` for a heading.

```example.jade
.panel.panel-default
  .panel-heading Panel heading
  .panel-body
    p(style='padding: 20px') Content goes here
```

#### `>> .panel-title`
Use it to make the text bigger.

```example.jade
.panel.panel-default
  .panel-heading
    .panel-title Panel heading with title
  .panel-body
    p(style='padding: 20px') Content goes here
```

#### `> .panel-footer`
Add `.panel-footer` for a footer.

```example.jade
.panel.panel-default
  .panel-body
    p(style='padding: 20px') Content goes here
  .panel-footer Panel footer
```

#### `&.panel-primary`
There are variants for `primary`, `success`, `info`, `error`.

```example.jade
.row
  .col-xs-4
    .panel.panel-primary
      .panel-heading Primary
      .panel-body panel-primary

  .col-xs-4
    .panel.panel-success
      .panel-heading Success
      .panel-body panel-success

  .col-xs-4
    .panel.panel-info
      .panel-heading Info
      .panel-body panel-info
```

### Progress bar
#### `.progress`
Use `.progress` with `.progress-bar`.

```example.jade
.progress
  .progress-bar(style='width: 60%')
```

#### Accessibility
Add `aria-value*` attributes and use `span.sr-only`.

```example.jade
.progress
  .progress-bar(role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: 60%')
    span.sr-only 60% Complete
```

#### With labels
Add text inside `.progress-bar`.

```example.jade
.progress
  .progress-bar(role='progressbar' aria-valuenow='60' aria-valuemin='0' aria-valuemax='100' style='width: 60%')
    | 60%
```

#### Alternatives
Add classes to `.progress-bar`.

```example.jade
.progress
  .progress-bar.progress-bar-success(style='width: 40%') progress-bar-success
.progress
  .progress-bar.progress-bar-info(style='width: 20%') progress-bar-info
.progress
  .progress-bar.progress-bar-warning(style='width: 60%') progress-bar-warning
.progress
  .progress-bar.progress-bar-danger(style='width: 80%') progress-bar-danger
```

#### `&.progress-bar-striped`
Striped variant.

```example.jade
.progress
  .progress-bar.progess-bar-striped.active(style='width: 40%')
```

### Jumbotron
#### `.jumbotron`

A big banner used by landing pages of startups with no designers.

```example.jade.-md
.container
  .jumbotron
    h3 Hello, earthlings!
    p We have now taken over your Internet.
    p
      a.btn.btn-primary.btn-lg Learn more
```
