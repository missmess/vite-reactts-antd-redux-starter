/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

const ENV_DIR = './env';

const htmlPlugin = (mode: string) => {
  const env = loadEnv(mode, ENV_DIR);
  // console.log('读取env内容:', env);
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>${env.VITE_APP_NAME}</title>`);
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  plugins: [react(), htmlPlugin(env.mode), basicSsl()],
  server: {
    open: true,
    // host: 'dev.chehejia.com',
    port: 8860,
    https: true,
  },
  envDir: ENV_DIR,
  css: {
    preprocessorOptions: {
      less: {
        // 需要公共导入的less文件
        // （每个less文件导入前都会执行。注意文件不能太大，不然会严重影响加载速度）
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/assets/css/variable.less')}";`,
        },
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
}));
