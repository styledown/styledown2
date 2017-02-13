browserify := ./node_modules/.bin/browserify
uglifyjs := ./node_modules/.bin/uglifyjs

all: gem

dist/styledown-external.js:
	@echo "==> building dist/"
	@${browserify} -t brfs -t babelify -s Styledown bare.js | ${uglifyjs} -c warnings=false -m > dist/styledown-external.js

gem: dist/styledown-external.js
	@echo "==> building styledown-source.rb/ (gem)"
	@cd styledown-source.rb && node update.js
	@cd styledown-source.rb && rm -f *.gem
	@cd styledown-source.rb && gem build *.gemspec

gem-push: gem
	@cd styledown-source.rb && gem push *.gem

.PHONY: gem all
