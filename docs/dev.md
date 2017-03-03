# Development notes

The best way to work on Styledown is to run the example in `examples/bootstrap`:

```sh
make example
open http://localhost:3000
```

## Other languages

A ruby gem is published, `styledown2-source`, which contains the styledown source. The source is in `integrations/ruby/`.

A hex package is also published, `styledown2_source`. The source is in `integrations/elixir/`.

```sh
make rubygem          # Builds the rubygem
make hex              # Builds the hex package
make publish-rubygem  # Push to rubygems.org
make publish-hex      # Push to hex.pm
```
