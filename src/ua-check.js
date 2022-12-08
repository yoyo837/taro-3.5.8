function check() {
  // 根据 window.UAParser 是否引用js来区分逻辑
  if (window.UAParser == null) {
    return;
  }
  const uaParser = window.UAParser();
  // IE 不处理，由html条件脚本判断
  // Chrome
  if (uaParser.browser.name === 'Chrome' && uaParser.browser.major < 58) {
    alert('您的Chrome版本过低，可能导致部分功能无法正常显示或使用！请升级到58及以上版本。');
    return;
  }
  // Firefox
  if (uaParser.browser.name === 'Firefox' && uaParser.browser.major < 60) {
    alert('您的Firefox版本过低，可能导致部分功能无法正常显示或使用！请升级到60及以上版本。');
    return;
  }
  // Android & Android Browser
  if (uaParser.os.name === 'Android') {
    if (
      uaParser.os.version.split('.')[0] < 9 &&
      uaParser.browser.name === 'Android Browser' &&
      uaParser.browser.major < 9
    ) {
      alert('您的手机Android系统版本过低，可能导致部分功能无法正常显示或使用！请升级到Android 9及以上版本。');
    }
    return;
  }
  // iOS
  if (uaParser.browser.name === 'Mobile Safari' && uaParser.browser.major < 11) {
    alert('您的手机iOS系统版本过低，可能导致部分功能无法正常显示或使用！请升级到iOS 11及以上版本。');
    return;
  }
  // Safari
  if (uaParser.browser.name === 'Safari' && uaParser.browser.major < 11) {
    alert('您的Safari版本过低，可能导致部分功能无法正常显示或使用！请升级到11及以上版本。');
  }
}

check();
