const addClass = require('dom101/add-class')
const removeClass = require('dom101/remove-class')
const ready = require('dom101/ready')

void (function () {
  ready(function () {
    var examples = document.querySelectorAll('.styleguide-example')

    for (var i = 0, len = examples.length; i < len; i++) {
      decorateExample(examples[i])
    }
  })

  function decorateExample ($example) {
    var $figure = $example.querySelector('.styleguide-example-figure')
    var $source = $example.querySelector('.styleguide-example-source')
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

    $figure.addEventListener('click', function () { toggle() })
    collapse()
  }
}());
