# Development notes

The best way to work on Styledown is to run the example in `examples/bootstrap`:

```sh
npm run example
open http://localhost:3000
```

## Ruby gem

A ruby gem is published, `styledown2-source`, which contains the styledown source. The source is in `integrations/ruby/`.

```sh
make rubygem        # Builds the rubygem
make rubygem-push   # Push to rubygems.org
```
