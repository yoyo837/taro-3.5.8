import { readonly } from 'vue';
import { request, getApp, setNavigationBarTitle } from '@tarojs/taro';
import {
  CDN_STATIC_HOST,
  isAndorid,
  isInAccessWebview,
  isStartsWithProtocol,
  isSZSMT,
  navigateTo,
  platformIsWeb,
  platformIsWeApp,
  randomUrl,
  mergeUrlQuery,
  getCurrentUrl,
} from '@/utils/utils';
import { appStore, sessionStore } from '@/utils/store';
import { alert, loading, loadingClose } from '@/utils/popup';

const $webStoreKey = {
  udid: '_UDID_',
  accessToken: `Access-Token`,
  openIdToken: `Openid-Token`,
};

// const toastHelper = reactive({
//   isLoading: false,
// });

function getIsomorphismUrl(url) {
  if (url == null) {
    return null;
  }
  if (isStartsWithProtocol(url)) {
    return url;
  }
  if (platformIsWeApp) {
    const app = getApp();
    return `${app.wxBaseHost}${url}`;
  }
  return url;
}

// 加载框的ajax数量
let ajaxLoadingCounter = 0;

const defaultCodeMsg = {
  ECONNABORTED: '服务器繁忙，请稍后再试',
  NaN: '未知错误',
  0: '服务器通信失败，请检查网络',
  400: '发出的请求有错误，服务器没有进行任何操作。',
  401: '请登录后再操作。',
  403: '您未授权访问请求的页面或资源，请联系相关人员后再试。',
  404: '发出请求的页面或资源不存在，服务器没有进行操作。',
  406: '请求的格式无法获得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护中。',
  504: '网关超时。',
};

function checkFeedback(noFeedback, code) {
  if (noFeedback) {
    return false;
  }
  switch (code) {
    case 429:
    case 100_301:
    case 100_302: {
      return false;
    }
    default: {
      break;
    }
  }
  if (isInAccessWebview() && code === 401) {
    return false;
  }
  return true;
}

function ajaxLoading(options) {
  const { silent } = options || {};
  if (silent) {
    return;
  }
  ajaxLoadingCounter += 1;
  if (ajaxLoadingCounter === 1) {
    // toastHelper.isLoading = true;
    loading();
  }
}

function ajaxComplete(options) {
  const { silent } = options || {};
  if (silent) {
    return;
  }
  ajaxLoadingCounter -= 1;
  if (ajaxLoadingCounter > 0) {
    return;
  }
  // toastHelper.isLoading = false;
  loadingClose();
}

function ajaxCover(result, resolve, reject, options) {
  const { code, data, msg } = result || {};
  if (code === 0) {
    resolve(data);
    return;
  }
  // FIXME: code 处理
  switch (code) {
    case 429: {
      navigateTo({
        url: `${CDN_STATIC_HOST}/html/busy.html`,
      });
      break;
    }
    case 100_301: // 需要获取 微信openid(支付临时获取)
    case 100_302: // 需要获取 微信openid
    case 100_304: {
      // 需要获取 微信openid(微信快捷登录)
      break;
    }
    case 100_303: // 强制关注
    case 100_203: {
      // user 需要完善资料
      break;
    }
    default: {
      break;
    }
  }
  const { noFeedback } = options || {};
  const error = new Error(msg || code);
  if (checkFeedback(noFeedback, code)) {
    alert(error.message);
  }
  reject(error);
}

function httpError(response, reject) {
  if (response instanceof Error) {
    alert(response.message);
    reject(response);
    return;
  }
  const { status, statusText } = response || {};
  const error = new Error(defaultCodeMsg[status] || statusText || status);
  const currentUrl = getCurrentUrl();
  switch (status) {
    case 401: {
      // 注意：这里已经router.push、router.replace来回改了很多遍了，不要再动了，push是对的，如遇问题从其他方面考虑解决
      // 比如，当你去到/user/my页面没有权限时，使用这里的push逻辑跳到了/user/login界面，如果你点返回，上一个页面还是/user/my，又报无权限来到/user/login，是对的，不能因为返回不了而来把push又改为replace
      // 2017年11月29日 改为 replace  https://codeup.aliyun.com/5f151104df9df74e36afac17/ydmap-code/ydmap-ssr-portal/commit/8ecacd94d3486bd9c13ff330003c9d20ea292152
      // 2020年02月14日 改回 push     https://codeup.aliyun.com/5f151104df9df74e36afac17/ydmap-code/ydmap-ssr-portal/commit/348cfc3b9496ac9bbd706fda4bb6bc8734e017bb
      // 2020年07月28日 改为 replace  https://codeup.aliyun.com/5f151104df9df74e36afac17/ydmap-code/ydmap-ssr-portal/commit/6acd4cd3e91e6ab23cf89b49a280c8c7bd3b82ce
      // 2021年06月29日 改回 push     https://codeup.aliyun.com/5f151104df9df74e36afac17/ydmap-code/ydmap-ssr-portal/commit/a1ee50bc2b0103b16ba96a27cd541287a7a6bbf2
      // 往第三方集成自动入口跳(不全支持)，避免一些第三方场景不应该出现登录
      // eslint-disable-next-line no-case-declarations
      const redirect = mergeUrlQuery('/user/login', {
        redirectURL: currentUrl,
      });
      if (platformIsWeb) {
        const url = mergeUrlQuery('/access/auto', {
          redirect,
        });
        navigateTo({
          url,
        });
      } else {
        navigateTo({
          url: redirect,
        });
      }
      break;
    }
    case 500: {
      // requestId 处理
      response
        .json()
        .catch(e => ({
          msg: e.message,
        }))
        .then(data => {
          const { requestId, msg } = data || {};
          const e500 = new Error(`${msg}, requestId: ${requestId || ''}`);
          alert(e500.message, {
            duration: 1000 * 5,
          });
          reject(e500);
        });
      return;
    }
    default:
  }
  alert(error.message);
  reject(error);
}

const buildHeader = (method, options) => {
  const { form } = options || {};
  const header = {
    // 接口的header名与storage的一样
    [$webStoreKey.accessToken]: appStore.get($webStoreKey.accessToken),
    [$webStoreKey.openIdToken]: appStore.get($webStoreKey.openIdToken),
  };
  if (method === 'POST' && form !== false) {
    // 默认是 application/json
    header['content-type'] = 'application/x-www-form-urlencoded';
  }
  return header;
};

const requestCore = (url, method, params, options) => {
  url = getIsomorphismUrl(url);
  if (method == null || method === 'GET') {
    url = randomUrl(url);
  }
  return new Promise((resolve, reject) => {
    ajaxLoading(options);
    request({
      url,
      data: params,
      method,
      header: buildHeader(method, options),
      success(response) {
        const { statusCode, data } = response;
        if (statusCode >= 200 && statusCode < 300) {
          ajaxCover(data, resolve, reject, options);
          return;
        }
        httpError(
          {
            ...response,
            status: statusCode,
          },
          reject
        );
      },
      fail(response) {
        httpError(response, reject);
      },
      complete() {
        ajaxComplete(options);
      },
    });
  });
};

const get = (url, params, options) => {
  return requestCore(url, 'GET', params, options);
};

const post = (url, params, options) => {
  return requestCore(url, 'POST', params, options);
};

const postJSON = (url, params, options) => {
  return post(url, params, {
    ...options,
    form: false,
  });
};

function $iszSdkConfig() {
  //
}

/**
 * 更新页面标题
 * @param {*} title
 * @returns
 */
function $updatePageTitle(title) {
  setNavigationBarTitle({
    title,
  });
  if (!platformIsWeb) {
    return;
  }
  if (!(isSZSMT() && isAndorid())) {
    return;
  }
  $iszSdkConfig().then(() => {
    const sc = window.sc;
    sc.setNavigationBarTitle(title == null ? '' : title, res => {
      if (res.code === 0) {
        return;
      }
      alert(`i深圳: ${res.message || res.code}`);
    });
  });
}

export default app => {
  const proto = {
    $updatePageTitle,
    $webStore: { appStore, sessionStore },
    $webStoreKey,
    getIsomorphismUrl,
  };
  const $http = {
    get,
    post,
    postJSON,
  };
  Object.assign(
    app.config.globalProperties,
    readonly({
      ...proto,
      // 直接丢 $http
      $http,
    })
  );
  app.provide(
    '$global',
    readonly({
      ...proto,
      // 打平 $http 的内容
      ...$http,
    })
  );
  // app.provide('$toastHelper', readonly(toastHelper));
};
