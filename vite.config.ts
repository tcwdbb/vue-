import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import path from 'path'
import { configCompressPlugin } from './src/utils/gizp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    configCompressPlugin('gzip', true),
    styleImport({
      resolves: [VantResolve()]
    })
  ],
  resolve: {
    // 导入文件夹别名
    alias: {
      '/images': 'src/assets/images',
      '@': path.resolve(__dirname, './src'),
      views: path.resolve(__dirname, './src/views'),
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      assets: path.resolve(__dirname, './src/assets'),
      com: path.resolve(__dirname, './src/components'),
      store: path.resolve(__dirname, './src/store'),
      mixins: path.resolve(__dirname, './src/mixins')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/mixin.scss";`
      }
    },
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            '> 1%'
          ],
          grid: true
        }),
        autoprefixer,
        require('postcss-px-to-viewport')({
          unitToConvert: 'px', // 需要转换的单位
          viewportWidth: 375, // 设计稿的视口宽度
          unitPrecision: 5, // 单位转换后保留的精度
          propList: ['*'], // 能转换的vw属性列表
          viewportUnit: 'vw', // 希望使用的视口单位
          fontViewportUnit: 'vw', // 字体使用的视口单位
          selectorBlackList: [], // 需要忽略的css选择器
          minPixelValue: 1, // 设置最小的转换数值，如果为1，只有大于1的值才会被转换
          mediaQuery: false, // 媒体查询中是否需要转换单位
          replace: true, // 是否直接更换属性值
          exclude: [],
          landscape: false,
          landscapeUnit: 'vw', // 横屏时使用的单位
          landscapeWidth: 568 // 横屏时使用的视口宽度
        })
      ]
    }
  },
  //打包配置
  build: {
    //浏览器兼容性  "esnext"|"modules"
    target: 'modules',
    //指定输出路径
    outDir: 'dist',
    //生成静态资源的存放路径
    assetsDir: 'assets',
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    //启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    //构建后是否生成 source map 文件
    sourcemap: false,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {},
    //@rollup/plugin-commonjs 插件的选项
    commonjsOptions: {},
    //当设置为 true，构建后将会生成 manifest.json 文件
    manifest: false,
    // 设置为 false 可以禁用最小化混淆，
    // 或是用来指定使用哪种混淆器
    // boolean | 'terser' | 'esbuild'
    minify: 'terser', //terser 构建后文件体积更小
    //传递给 Terser 的更多 minify 选项。
    terserOptions: {},
    //设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //启用/禁用 brotli 压缩大小报告
    brotliSize: true,
    //chunk 大小警告的限制
    chunkSizeWarningLimit: 2000
  }
})
