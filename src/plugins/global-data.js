import { setGlobalDataPlugin } from '@tarojs/taro';
import { platformIsWeApp } from '@/utils/utils';
// 注意: 这是个 node.js 文件
import proxy from '../../config/proxy-config';

const defaultProxyItem = proxy[Object.keys(proxy)[0]];

export default app => {
  const taroGlobalData = {
    // 本地开发工具请在详情中勾选:✅“不校验合法域名、web-view(业务域名)、TLS版本以及HTTPS证书”
    wxBaseHost: defaultProxyItem.target,
  };
  if (platformIsWeApp) {
    const info = wx.getAccountInfoSync();
    switch (info.miniProgram.envVersion) {
      case 'release': {
        taroGlobalData.wxBaseHost = 'https://portal.ydmap.cn';
        break;
      }
      case 'trial': {
        taroGlobalData.wxBaseHost = 'https://test-portal.ydmap.cn';
        break;
      }
      // develop 直接使用 proxy-config.js 的代理配置, 以保持与 h5 的代理一致
      // case 'develop':
      //   break;
      default: {
        break;
      }
    }
  }
  app.use(setGlobalDataPlugin, taroGlobalData);
};
