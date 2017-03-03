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

  @version "${VERSION.replace(/\.pre/, '-pre')}"
  @description """
  Write maintainable CSS styleguides using Markdown.
  """

  def project do
    [
      app: :styledown2_source,
      version: @version,
      description: @description,
      elixir: "~> 1.3",
      build_embedded: Mix.env == :prod,
      start_permanent: Mix.env == :prod,
      source_url: "https://github.com/styledown/styledown2",
      homepage_url: "https://github.com/styledown/styledown2",
      docs: docs,
      package: package,
      deps: deps,
    ]
  end

  def application do
    [applications: [:logger]]
  end

  defp deps do
    [
      {:earmark, "~> 0.1", only: :dev},
      {:ex_doc, "~> 0.11", only: :dev}
    ]
  end

  def package do
    [
      maintainers: ["Rico Sta. Cruz"],
      licenses: ["MIT"],
      files: ["lib", "mix.exs", "README.md"],
      links: %{github: "https://github.com/styledown/styledown2"}
    ]
  end

  def docs do
    [
      source_ref: "v#{@version}",
      main: "readme"
    ]
  end
end
`

mkdirp('vendor/')
writeFileSync('mix.exs', MIX_EXS, 'utf-8')
writeFileSync('vendor/styledown2.js', SOURCE, 'utf-8')
