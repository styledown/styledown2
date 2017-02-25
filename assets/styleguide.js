const addClass = require('dom101/add-class')
const removeClass = require('dom101/remove-class')
const ready = require('dom101/ready')
const on = require('dom101/on')
const each = require('dom101/each')
const requestAnimationFrame = require('raf')
const iframeResizer = require('iframe-resizer/js/iframeResizer')

!(function () {
  ready(function () {
    var examples = document.querySelectorAll('.styleguide-example')

    for (var i = 0, len = examples.length; i < len; i++) {
      decorateExample(examples[i])
    }
  })

  function decorateExample ($example) {
    var $figure = $example.querySelector('.styleguide-example-figure')
    var $source = $example.querySelector('.styleguide-example-source')
    var $viewSource = $figure.querySelector('[data-js-view-source]')
    var collapsed

    function collapse () {
      addClass($example, '-collapse')
      removeClass($example, '-expand')
      collapsed = true
    }

    function expand () {
      removeClass($example, '-collapse')
      addClass($example, '-expand')
      collapsed = false
    }

    function toggle () {
      return collapsed ? expand() : collapse()
    }

    on($viewSource, 'click', toggle)
    collapse()
  }
}())

/*
 * Sidebar
 */

!(function () {
  const $toggle = document.querySelector('[data-js-sidebar-toggle]')
  const $html = document.documentElement

  on($toggle, 'change', update)

  function update () {
    const val = $toggle.checked

    if (val) {
      addClass($html, '-styleguide-sidebar-open')
    } else {
      removeClass($html, '-styleguide-sidebar-open')
    }
  }

  if (window.innerWidth > 960) {
    $toggle.checked = true
  } else {
    $toggle.checked = false
  }

  update()
}())

!(function () {
  const $html = document.documentElement

  requestAnimationFrame(() => {
    addClass($html, '-styleguide-loaded')
  })
}())

/*
 * Auto size iframes
 */

!(function () {
  iframeResizer({}, 'iframe')
}())
