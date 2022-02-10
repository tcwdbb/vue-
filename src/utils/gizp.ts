import type { Plugin } from 'vite'
import compressPlugin from 'vite-plugin-compression'

export const configCompressPlugin = (
  compress: 'gzip' | 'brotli' | 'none',
  deleteOriginFile = false
): Plugin | Plugin[] => {
  const compressList = compress.split(',')

  const plugins: Plugin[] = []

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        threshold: 1024,
        deleteOriginFile
      })
    )
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        threshold: 1024,
        deleteOriginFile
      })
    )
  }
  return plugins
}
