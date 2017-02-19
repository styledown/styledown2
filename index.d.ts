/// <reference types="node" />
/// <reference types="core-js" />

interface ReadOptions {
  spec?: string
}

interface StyledownFile {
  contents?: string | Buffer
  type: string
}

interface StyledownFileList {
  [key: string]: StyledownFile
}

export function styledownBuild (data: any, options: any): any
export function styledownRender (data: any, options: any): any
export function styledownCache (data: any, options: any): any
export function styledownRead (files: string | string[], options?: ReadOptions): StyledownFileList

export {
  cache as styledownCache,
  render as styledownRender,
  build as styledownBuild,
  read as styledownRead
}
