# Grid

### Columns

```example.jade.-full
.container
  .row
    .col-md-4
      .grid-example col-md-4
    .col-md-4
      .grid-example col-md-4
    .col-md-4
      .grid-example col-md-4
  br
  .row
    .col-md-8
      .grid-example col-md-8
    .col-md-4
      .grid-example col-md-4
  br
  .row
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
    .col-md-1
      .grid-example col-md-1
// {remove:[4,6,8],strip:[1],snip:[]}
```

### Media queries

```css
/* Extra small devices (phones, less than 768px) */
/* No media query since this is the default in Bootstrap */

/* Small devices (tablets, 768px and up) */
@media (min-width: @screen-sm-min) { ... }

/* Medium devices (desktops, 992px and up) */
@media (min-width: @screen-md-min) { ... }

/* Large devices (large desktops, 1200px and up) */
@media (min-width: @screen-lg-min) { ... }
```

