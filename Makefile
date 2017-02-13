browserify := ./node_modules/.bin/browserify
uglifyjs := ./node_modules/.bin/uglifyjs

all: rubygem

dist/styledown-external.js:
	@echo "==> building dist/"
	@${browserify} -t brfs -t babelify -s Styledown bare.js | ${uglifyjs} -c warnings=false -m > dist/styledown-external.js

# Builds the ruby gem
rubygem: dist/styledown-external.js
	@echo "==> building integrations/ruby/ (gem)"
	@cd integrations/ruby && node update.js
	@cd integrations/ruby && rm -f *.gem
	@cd integrations/ruby && gem build *.gemspec

rubygem-push: gem
	@echo "==> pushing gem"
	@cd integrations/ruby && gem push *.gem

.PHONY: gem all
