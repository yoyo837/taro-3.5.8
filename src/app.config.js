// 配置列表在这 https://docs.taro.zone/docs/app-config
import { getPages } from '../config/router';

export default defineAppConfig({
  pages: getPages(),
  plugins: {
    // 网易易盾行为验证
    captcha: {
      version: '1.3.0',
      provider: 'wxb7c8f9ea9ceb4663',
    },
  },
  usingComponents: {
    'ne-captcha': 'plugin://captcha/ne-captcha',
  },
  window: {
    // 微信有效
    backgroundTextStyle: 'light',
    // 下面3个在h5,RN,微信均有效
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    // 其他的平台暂时不管
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示',
    },
  },
});
