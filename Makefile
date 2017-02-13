browserify := ./node_modules/.bin/browserify
uglifyjs := ./node_modules/.bin/uglifyjs

SOURCES := $(shell find lib assets)

all: rubygem

#
# Builds a bare distribution, used by Ruby and Elixir integrations
#

dist/styledown-external.js: $(SOURCES)
	@echo "==> building dist/"
	@$(browserify) -t brfs -t babelify -s Styledown bare.js | $(uglifyjs) -c warnings=false -m > dist/styledown-external.js

#
# Builds the ruby gem
#

rubygem: \
	dist/styledown-external.js \
	package.json \
	integrations/ruby/update.js
	@echo "==> building integrations/ruby/ (gem)"
	@cd integrations/ruby && node update.js
	@cd integrations/ruby && rm -f *.gem
	@cd integrations/ruby && gem build *.gemspec

#
# Pushes the ruby gem to rubygems.org
#

rubygem-push: gem
	@echo "==> pushing gem"
	@cd integrations/ruby && gem push *.gem

.PHONY: all rubygem rubygem-push
