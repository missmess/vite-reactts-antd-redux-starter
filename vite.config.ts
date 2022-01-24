/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: true,
    port: 6893,
  },
  css: {
    preprocessorOptions: {
      less: {
        // 需要公共导入的less文件
        // （每个less文件导入前都会执行。注意文件不能太大，不然会严重影响加载速度）
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/assets/css/variable.less')}";`,
        },
        // additionalData: '@import "./src/assets/css/variable.less";',
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: [
      // 将'@/'设置为src目录的别名
      { find: /^@\//, replacement: path.join(__dirname, 'src/') },
    ],
  },
});
