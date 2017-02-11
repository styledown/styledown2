require('babel-register')
Object.assign(exports, require('./external'))
exports.parseFiles = require('./lib/parse_files')
