# Example scenarios

### Log in form
Typical log in form involving a panel, input groups, and buttons.

```example.jade.-wide
.col-sm-6.col-sm-offset-3
  .panel.panel-default
    .panel-body
      p: .input-group
        .input-group-addon
          i.glyphicon.glyphicon-envelope
        input.form-control(placeholder='Email address')
      p: .input-group
        .input-group-addon
          i.glyphicon.glyphicon-asterisk
        input.form-control(placeholder='Password' type='password')
      p: button.btn.btn-primary Log in
```

### Navigation bar

Simple fixed navbar.

```example.jade.-wide
nav.navbar.navbar-default.navbar-fixed-top
  .container
    .navbar-header
      a.navbar-brand Brand

    ul.nav.navbar-nav
      li: a Home
      li: a Features
      li: a Pricing
      li: a Contact us

    form.navbar-form.navbar-right
      .form-group
        input.form-control(type='text' placeholder='Search')
        = ' '
        button.btn.btn-default Search

br
br
br
br
```
