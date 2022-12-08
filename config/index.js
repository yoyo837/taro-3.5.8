const webpack = require('webpack');
const CDN_STATIC_HOST = "https:xxx.www.com"
// const ESLintPlugin = require('eslint-webpack-plugin');
// const StylelintPlugin = require('stylelint-webpack-plugin');
const uaParserVersion = require('ua-parser-js/package.json').version;
const jsencryptVersion = require('jsencrypt/package.json').version;
const { getCustomRoutes } = require('./router');

const customRoutes = getCustomRoutes();

const taroEnv = process.env.TARO_ENV;
// build 环境
const isProd = process.env.NODE_ENV === 'production';

const webpackpPlugins = [
  // dev 时报错
  // in [eslint] No files matching '/Users/tanghui/git/ydmap/web/ydmap-frontend-portal/src/app.boot.js' were found.
  // 先Ctrl + S, save 下临时解决
  // {
  //   name: 'eslint',
  //   instance: new ESLintPlugin({
  //     extensions: ['js', 'vue'],
  //   }),
  // },
  // {
  //   name: 'stylelint',
  //   instance: new StylelintPlugin({
  //     // files: '**/*.s?(a|c)ss', // default
  //     files: ['**/*.s?(a|c)ss', '**/*.vue'],
  //   }),
  // },
  {
    name: 'moment-ContextReplacement',
    instance: new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
  },
];

const timestamp = Date.now();

// const path = require('path');
const config = {
  projectName: 'Portal跨端',
  date: '2022-9-14',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [
    '@tarojs/plugin-html',
    '@dcasia/mini-program-tailwind-webpack-plugin/dist/taro',
    // https://github.com/vuejs/pinia/pull/967
    //  'taro-plugin-pinia'
    [
      '@tarojs/plugin-framework-vue3',
      {
        vueLoaderOption: {
          compilerOptions: {
            isCustomElement: tag => tag.includes('ne-captcha'),
            whitespace: 'preserve',
            // ...
          },
          reactivityTransform: true, // 开启vue3响应性语法糖
        },
      },
    ],
  ],
  defineConstants: {},
  copy: {
    patterns: [
      // {
      //   from: 'src/static/h5/',
      //   to: 'dist/h5/',
      //   // ignore: ['*.js'],
      // },
      // 指定需要 copy 的文件
      taroEnv === 'h5' && { from: 'src/ua-check.js', to: 'dist/h5/js/ua-check.js' },
    ].filter(Boolean),
    options: {},
  },
  framework: 'vue3',
  compiler: 'webpack5',
  cache: {
    enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass: {
    // resource: [],
    // 给 sass-loader 传递选项 ！！！！ 按需加载方式必须配置
    data: '@import "/src/assets/themes/variables.scss";',
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: ['nut-'],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    webpackChain(chain) {
      webpackpPlugins.forEach(({ name, instance }) => {
        chain.plugin(name).use(instance);
      });
    },
  },
  h5: {
    router: {
      mode: 'browser',
      customRoutes,
    },
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['nutui-taro'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    webpackChain(chain) {
      webpackpPlugins.forEach(({ name, instance }) => {
        chain.plugin(name).use(instance);
      });
    },
    htmlPluginOption: {
      templateParameters: {
        taroEnv,
        h5Scripts: [
          isProd && {
            url: `https:${CDN_STATIC_HOST}/static/ua-parser-js/${uaParserVersion}/dist/ua-parser.min.js`,
          },
          isProd && {
            url: `/js/ua-check.js?_time=${timestamp}`,
          },
          {
            url: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
          },
          {
            url: `https:${CDN_STATIC_HOST}/static/jsencrypt/${jsencryptVersion}/bin/jsencrypt.min.js`,
          },
          // // i深圳app和深圳地铁app都是出自平安科技同一套框架下的两个实例App, 同时引用会有命名冲突问题
          // // i深圳app和深圳地铁app, 写死两个srvInfo id
          // {
          //   url: `/srv${isProd ? '100206' : '100436'}/api/pub/tool/getJsByUserAgent?isz=${encodeURIComponent(
          //     'https://isz-open.sz.gov.cn/lib/jpasc-0.4.0.js'
          //   )}&szmc=${encodeURIComponent(
          //     'https://szmc-intweb.shenzhenmc.com/app/lib/jpasc-0.4.0.js'
          //   )}&_time=${timestamp}`,
          // },
        ].filter(Boolean),
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
