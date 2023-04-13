import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const postcssPresetEnv = require("postcss-preset-env");
const px2viewport = require("postcss-px-to-viewport");
import vueSetupExtend from 'vite-plugin-vue-setup-extend';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueSetupExtend()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "src/common/style/color.scss"; @import "src/common/style/global.scss";'
      }
    },
    postcss: {
      plugins: [
        postcssPresetEnv({}),
        px2viewport({
          viewportWidth: 1920, // UI设计稿的宽度
          viewportHeight: 1080, // UI设计稿的高度
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          // unitPrecision: 6, // 转换后的精度，即小数点位数
          // unitToConvert: "px", // 要转化的单位
          // viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          // fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          // selectorBlackList: ["ignore"], // 指定不转换为视窗单位的类名，
          // minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          // mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          // replace: true, // 是否转换后直接更换属性值
          // exclude: [/^(?!.*node_modules\/vant)/], // 设置忽略文件，用正则做目录名匹配
          // landscape: false, // 是否处理横屏情况
        })
      ]
    }
  },

  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString()
          }
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: 'js/[name].[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        // 　　chunkFileNames: 'js/[name].[hash].js',
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: '[ext]/[name].[hash].[ext]',
        // 拆分js到模块文件夹
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : [];
          const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]';
          return `js/${fileName}/[name].[hash].js`;
        },
      }
    }
  }
})
