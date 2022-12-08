import { navigateTo as nvTo, redirectTo as redTo, getEnv, ENV_TYPE } from '@tarojs/taro';
import { appStore } from '@/utils/store';
import { parse, stringify } from 'qs';
import { platformIsWeb } from './env';
import { getPageKeyByRouterUrl } from '../../config/router';

export * from './env';

export * from './cross-platform';

const CDN_STATIC_HOST = '';

export function getPageQuery(url = isBrowser ? window.location.href : '') {
  return parse(url.split('?')[1]);
}

export function mergeUrlQuery(str, newQuery, delKeys, h) {
  let url = str || '';
  const params = newQuery || {};
  const hashSp = url.split('#');
  const hash = h || hashSp[1];
  [url] = hashSp;
  // 合并地址栏参数和对象参数
  const sps = url.split('?');
  const params0 = getPageQuery(url);
  Object.assign(params0, params);
  if (Array.isArray(delKeys)) {
    delKeys.forEach(key => {
      delete params0[key];
    });
  }
  const search = stringify(params0);
  url = `${sps[0]}${search.length > 0 ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
  return url;
}

const isSZSMT = () => false;
const isWeLink = () => false;
const isCCB = () => false;
const isAndorid = () => false;
const isMiniProgram = () => false;
const isStartsWithProtocol = () => false;
const isNumber = val => typeof val === 'number';
const isMobile = () => true;

const platformIsWeApp = true;

const getCurrentUrl = () => {};

export {
  CDN_STATIC_HOST,
  isAndorid,
  isStartsWithProtocol,
  isSZSMT,
  isNumber,
  isMobile,
  platformIsWeb,
  platformIsWeApp,
  getCurrentUrl,
};

export function getRouterUrl(url) {
  return platformIsWeb ? url : getPageKeyByRouterUrl(url);
}

const webviewUrl = getRouterUrl('/webview');

export function navigateTo(options) {
  const { url } = options || {};
  if (isStartsWithProtocol(url)) {
    if (platformIsWeb) {
      location.href = url;
      return;
    }
    nvTo({
      url: mergeUrlQuery(webviewUrl, {
        url,
      }),
    });
    return;
  }
  const { srvId } = getPageQuery();
  const useUrl = mergeUrlQuery(getRouterUrl(url), {
    srvId,
  });
  nvTo({
    ...options,
    url: useUrl,
  });
}

export function redirectTo(options) {
  const { url } = options || {};
  if (isStartsWithProtocol(url)) {
    if (platformIsWeb) {
      location.replace(url);
      return;
    }
    redTo({
      url: mergeUrlQuery(webviewUrl, {
        url,
      }),
    });
    return;
  }
  const { srvId } = getPageQuery();
  const useUrl = mergeUrlQuery(getRouterUrl(url), {
    srvId,
  });
  redTo({
    ...options,
    url: useUrl,
  });
}

/**
 * 加随机参数
 * @param {*} url
 * @param {*} options
 */
export function randomUrl(url, options) {
  options = options || {};
  if (options.rich || options.cache) {
    return url;
  }
  if (url) {
    const params = getPageQuery(url);
    params._time = Date.now();
    return mergeUrlQuery(url, params); // merge到url
  }
  return url;
}

const LHWLQKL_KEY = 'lhwlqkl';
const ISZWHYJYY_KEY = 'isz_whyjyy';

/**
 * 是龙华文旅区块链小程序webview中
 * @returns
 */
export function isLHWLQKL() {
  if (isMiniProgram()) {
    return !!appStore.get(LHWLQKL_KEY);
  }
  return false;
}

export function flushToLHWLQKL() {
  appStore.put(LHWLQKL_KEY, true);
}

/**
 * 是i深圳文化一键预约拉起的场景，实际在i深圳webview中
 * @returns
 */
export function isISZWHYJYY() {
  if (isSZSMT() && window.parent !== window) {
    return !!appStore.get(ISZWHYJYY_KEY);
  }
  return false;
}

export function flushToISZWHYJYY() {
  appStore.put(ISZWHYJYY_KEY, true);
}

export function isInAccessWebview() {
  if (getEnv() === ENV_TYPE.WEB) {
    return (
      isSZSMT() || // i深圳
      isWeLink() || // welink
      window.ReactNativeWebView != null || // i罗湖
      isLHWLQKL() || // 龙华文旅
      isISZWHYJYY() || // i深圳的文化一键预约
      isCCB() // 建行生活
    );
  }
  return false;
}

/**
 * 异步获取dom rect
 * @param {*} dom
 * @returns
 */
export function getBoundingClientRectAsync(dom) {
  if (dom == null) {
    //
    return Promise.resolve();
  }
  return new Promise(resolve => {
    if (platformIsWeb) {
      const clientRect = dom.getBoundingClientRect();
      const { left, right, top, bottom, height, width } = clientRect;
      resolve({
        left,
        right,
        top,
        bottom,
        height,
        width,
      });
      return;
    }
    dom.getBoundingClientRect().then(data => {
      const clientRect = data || {};
      const { left, right, top, bottom, height, width } = clientRect;
      resolve({
        left,
        right,
        top,
        bottom,
        height,
        width,
      });
    });
  });
}
