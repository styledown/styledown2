# coding: utf-8
require File.expand_path('../lib/styledown/source/version', __FILE__)

Gem::Specification.new do |spec|
  spec.name          = 'styledown2-source'
  spec.version       = Styledown::Source::VERSION
  spec.authors       = ['Rico Sta. Cruz']
  spec.email         = ['rstacruz@users.noreply.github.com']

  spec.summary       = 'Write maintainable CSS styleguides using Markdown'
  spec.description   = 'Styledown lets you write maintainable CSS styleguides using Markdown.'
  spec.homepage      = 'https://github.com/styledown/styledown2'
  spec.license       = 'MIT'

  # spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.files         = [
    'lib/styledown/source/version.rb',
    'lib/styledown/source.rb'
  ]
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']
end
