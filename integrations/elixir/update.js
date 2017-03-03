const mkdirp = require('mkdirp').sync
const writeFileSync = require('fs').writeFileSync
const readFileSync = require('fs').readFileSync
const resolve = require('path').resolve

const VERSION = require('../../package.json').version
  .replace(/-/g, '.')

const SOURCE = readFileSync(
  resolve(__dirname, '../../dist/styledown-external.js'), 'utf-8')

const MIX_EXS =
`defmodule Styledown2Source.Mixfile do
  use Mix.Project

  def project do
    [app: :styledown2_source,
     version: "${VERSION.replace(/\.pre/, '-pre')}",
     elixir: "~> 1.3",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps()]
  end

  def application do
    [applications: [:logger]]
  end

  defp deps do
    []
  end
end`

mkdirp('vendor/')
writeFileSync('mix.exs', MIX_EXS, 'utf-8')
writeFileSync('vendor/styledown2.js', SOURCE, 'utf-8')
