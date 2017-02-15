const TEMPLATES = require('../templates')

/**
 * Adds built-in templates
 */

function addDefaultTemplates (result) {
  result.templates = Object.assign({}, TEMPLATES)
  return result
}

/*
 * Export
 */

module.exports = addDefaultTemplates
