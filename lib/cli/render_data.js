/**
 * Renders a JSON structure `data` into a readable format.
 *
 *     render({ name: 'John' }, { yaml: true })
 *     render({ name: 'John' }, { json: true })
 */

function render (data, options) {
  if (options.yaml) {
    return toYaml(data)
  } else if (options.json) {
    return toJson(data)
  } else if (options.inspect || process.stdout.isTTY) {
    return toInspect(data)
  } else {
    return toJson(data)
  }
}

/*
 * Parse to YAML (--yaml)
 */

function toYaml (data) {
  return require('js-yaml').safeDump(data)
}

/*
 * Parse to JSON (default, --json)
 */

function toJson (data) {
  return JSON.stringify(data, null, 2)
}

function toInspect (data) {
  return require('util').inspect(data, { depth: null, colors: true })
}

module.exports = render
