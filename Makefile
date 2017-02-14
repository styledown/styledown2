root = "$(shell pwd -LP)"
bin := ${root}/node_modules/.bin
browserify := ${bin}/browserify
uglifyjs := ${bin}/uglifyjs

SOURCES := $(shell find lib assets)

all: rubygem

#
# Builds a bare distribution, used by Ruby and Elixir integrations
#

dist/styledown-external.js: ${SOURCES}
	@echo "==> building dist/"
	@${browserify} -t brfs -t babelify -s Styledown bare.js | ${uglifyjs} -c warnings=false -m > dist/styledown-external.js

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

rubygem\:push: rubygem
	@echo "==> pushing gem"
	@cd integrations/ruby && gem push *.gem

#
# Cached version of js/css
#

cache: cache/style.css cache/script.js
cache/style.css: assets/style.css
	@${bin}/postcss -u postcss-cssnext -u cssnano $< -o $@
	@echo "==> $@"
cache/script.js: assets/script.js
	@${bin}/browserify -t babelify $< | ${bin}/uglifyjs -c warnings=false -m > $@
	@echo "==> $@"

#
# Examples
#

example: examples/bootstrap/html cache
	@${bin}/concurrently "make watch-example" "make watch-assets" "make serve-example"
examples/bootstrap/html: examples/bootstrap
	@cd $< && make
	@echo "==> $@"

serve-example:
	@cd examples/bootstrap/html && ${bin}/serve

watch-assets:
	@${bin}/nodemon -C --exec "make cache" --ext "css js" --watch assets --quiet
watch-example:
	@${bin}/nodemon -C --exec "make examples/bootstrap/html" --ext "md js css" --watch ${root}/cache --quiet


.PHONY: examples examples/bootstrap/html cache
