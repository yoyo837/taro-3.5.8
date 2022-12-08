// 路由配置, 左侧为实际使用路由,右侧为小程序实际路由和文件实际路径, 需要包装到组件和方法中
// 应用内跳转和link统一使用左侧
// 应用外,h5提供左侧,小程序提供右侧
// 加完配置 要重新run dev

const router = {
  '/': '/pages/index/index',
  '/webview': '/pages/webview/index',
  '/access/auto': '/pages/access/auto/index',
  '/user/my': '/pages/user/my/index',
  '/user/register': '/pages/user/register/index',
  '/user/login': '/pages/user/login/index',
  '/user/account': '/pages/user/account/index',
  '/user/forgot': '/pages/user/forgot/index',
  '/match': '/pages/match/index/index',
  '/match/judge': '/pages/match/judge/index',
  '/activity': '/pages/activity/index/index',
  '/activity/signup': '/pages/activity/signup/index',
};

const customRoutes = {};
// 调换key、value
Object.keys(router).forEach(key => {
  const path = router[key];
  customRoutes[path] = key;
});

export function getPages() {
  return Object.keys(customRoutes).map(item => item.slice(1));
}

export function getPageKeyByRouterUrl(url) {
  return router[url];
}

export function getCustomRoutes() {
  return {
    ...customRoutes,
  };
}
