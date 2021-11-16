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
        additionalData: '@import "./src/assets/css/index.less";', // 添加公共样式
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
