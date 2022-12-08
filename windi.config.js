// @ts-check - enable TS check for js file
import { defineConfig } from 'windicss/helpers';
const { merge } = require('lodash');
const config = require('./config/index')(merge);

// https://windicss.org/guide/configuration.html
module.exports = defineConfig({
  prefixer: false,
  extract: {
    include: ['src/**/*.{vue,html,css,scss}'],
    // 忽略部分文件夹
    exclude: ['node_modules', '.git', 'dist', '.vscode', '.husky'],
  },
  corePlugins: {
    // 禁用掉在小程序环境中不可能用到的 plugins
    container: false,
  },
  theme: {
    extend: {
      textColor: {
        main: 'var(--main-color)',
        title: 'var(--title-text-color)',
        default: 'var(--default-text-color)',
        descr: 'var(--descr-text-color)',
        body: 'var(--body-text-color)',
        white: 'var(--white-text-color)',
        exam: 'var(--exam-text-color)',
        exam2: 'var(--exam-secondary-color)',
      },
      colors: {
        default: 'var(--default-bg-color)',
        white: 'var(--white-bg-color)',
        gray: 'var(--gray-bg-color)',
        main: 'var(--main-bg-color)',
        thirdary: 'var(--thirdary-bg-color)',
        // border: 'var(--border-color)',
        // formItem: 'var(--form-bg-color)',
        // myLeft: 'var(--my-bg-l)',
        // myRight: 'var(--my-bg-r)',
        // charge: 'var(--recharge-bg-color)',
        // exam: 'var(--exam-text-color)',
        // exam2: 'var(--exam-secondary-color)',
      },
      borderColor: {
        default: 'var(--border-color)',
      },
      // TODO 边框色
    },
  },
  designWidth: config.designWidth,
});
