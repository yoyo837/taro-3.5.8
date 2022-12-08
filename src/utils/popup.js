import { showToast, showLoading, hideLoading } from '@tarojs/taro';

// 显示 loading 提示框。需主动调用 Taro.hideLoading 才能关闭提示框

// 注意

// Taro.showLoading 和 Taro.showToast 同时只能显示一个
// Taro.showLoading 应与 Taro.hideLoading 配对使用

export function alert(msg, opts) {
  const { duration } = opts || {};
  const op = {
    title: msg,
    icon: 'error',
    duration: 1000 * 3,
  };
  // 结构的 undefined api不接受
  if (duration > 0) {
    op.duration = duration;
  }
  return showToast(op);
}

export function loading() {
  showLoading({
    title: '加载中...',
    mask: true,
  });
}

export function loadingClose() {
  hideLoading();
}
