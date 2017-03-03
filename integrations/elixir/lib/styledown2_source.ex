# encoding: utf-8
defmodule Styledown2Source do
  @external_resource js_source = Path.join(~w(#{File.cwd!} vendor styledown2.js))
  @js_source js_source

  def source do
    File.read! @js_source
  end
end
