defmodule Styledown2SourceTest do
  use ExUnit.Case
  doctest Styledown2Source

  test "starts with '!function'" do
    assert "!function" <> _ = Styledown2Source.source
  end

  test "is interpolatable" do
    assert "lol #{Styledown2Source.source}"
  end
end
