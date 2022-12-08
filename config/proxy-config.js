// 注意: 这个文件简单点, node、web、小程序都会导入, 以满足一处配置, 多端生效

const serverTargetConfig = {
  // target 不要添加末尾的斜杠"/"以兼容小程序
  // target: 'http://localhost:8200',
  // changeOrigin: false,
  // target: 'http://192.168.0.32:8200',
  // changeOrigin: true,
  target: 'https://dev2-portal.ydmap.cn',
  changeOrigin: true,
};

export default {
  '/srv*/api/**': serverTargetConfig,
  '/_AMapService': serverTargetConfig,
};
