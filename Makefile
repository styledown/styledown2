root = "$(shell pwd -LP)"
bin := ${root}/node_modules/.bin
browserify := ${bin}/browserify
uglifyjs := ${bin}/uglifyjs

SOURCES := $(shell find lib assets)

all: rubygem

#
# Builds a bare distribution, used by Ruby and Elixir integrations
#

dist/styledown-external.js: bare.js ${SOURCES}
	@echo "--- building: $@"
	@${bin}/browserify -t brfs -t babelify -s Styledown $< | \
		${bin}/uglifyjs -c warnings=false -m > $@
	@ls -lah $@

#
# Builds the ruby gem
#

rubygem: \
	integrations/ruby \
	dist/styledown-external.js \
	package.json \
	integrations/ruby/update.js
	@echo "--- building: integrations/ruby/ (gem)"
	@cd integrations/ruby && node update.js
	@cd integrations/ruby && rm -f *.gem
	@cd integrations/ruby && gem build *.gemspec

#
# Pushes the ruby gem to rubygems.org
#

publish-rubygem: rubygem
	@echo "==> pushing gem"
	@cd integrations/ruby && gem push *.gem

hex: \
	integrations/elixir \
	dist/styledown-external.js \
	package.json \
	integrations/elixir/update.js
	@echo "--- building: integrations/elixir/ (hex)"
	@cd integrations/elixir && node update.js
	@cd integrations/elixir && mix deps.get

publish-hex: hex
	@echo "==> pushing hex package"
	@cd integrations/elixir && mix hex.publish

#
# Cached version of js/css
#

cache: \
	cache/styleguide.css \
	cache/styleguide.js \
	cache/figure.css \
	cache/figure.js
cache/%.css: assets/%.css $(shell find assets -name '*.css')
	@${bin}/postcss -u postcss-import -u postcss-cssnext -u cssnano $< -o $@
	@ls -lah $@
cache/%.js: assets/%.js $(shell find assets -name '*.js')
	@${bin}/browserify -t babelify $< | ${bin}/uglifyjs -c warnings=false -m > $@
	@ls -lah $@

#
# Examples
#

example: cache examples/bootstrap/html
	@${bin}/concurrently --kill-others \
		--prefix "[{name}]" --names "example,assets,serve" \
		"make watch-example" "make watch-assets" "make serve-example"

examples/bootstrap/html: examples/bootstrap
	@cd $< && make
	@tree -h $@

examples/bootstrap/html/README.md:
	echo "Generated from https://github.com/styledown/styledown2/blob/master/examples/bootstrap" > $@

serve-example:
	@cd examples/bootstrap/html && ${bin}/serve

watch-assets:
	@${bin}/nodemon -C --quiet \
		--exec "make cache" \
		--ext "css js" \
		--watch assets

watch-example:
	@${bin}/nodemon -C --quiet \
		--exec "make examples/bootstrap/html" \
		--ext "md js css" \
		--watch examples/bootstrap/src \
		--watch cache

# Publishes to styledown.github.io/bootstrap-styleguide
publish-example: examples/bootstrap/html examples/bootstrap/html/README.md
	${bin}/git-update-ghpages --force --branch gh-pages \
		styledown/bootstrap-styleguide $<

.PHONY: examples examples/bootstrap/html cache dist/styledown-external.js
