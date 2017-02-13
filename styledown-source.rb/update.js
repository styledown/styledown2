const mkdirp = require('mkdirp').sync
const writeFileSync = require('fs').writeFileSync
const readFileSync = require('fs').readFileSync
const resolve = require('path').resolve

const VERSION = require('../package.json').version
  .replace(/-/g, '.')

mkdirp('lib/styledown/source/')

const SOURCE = readFileSync(
  resolve(__dirname, '../dist/styledown-external.js'), 'utf-8')

const VERSION_FILE =
`# coding: utf-8
class Styledown
  module Source
    VERSION = '${VERSION}'
  end
end`

const SOURCE_FILE =
`# coding: utf-8
class Styledown
  module Source
    SOURCE = <<-'STYLEDOWN_END'
${SOURCE}
STYLEDOWN_END
  end
end
${SOURCE.replace(/'/g, "\\'")}`

writeFileSync('lib/styledown/source/version.rb', VERSION_FILE, 'utf-8')
writeFileSync('lib/styledown/source.rb', SOURCE_FILE, 'utf-8')
