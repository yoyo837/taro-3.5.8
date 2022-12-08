// nutui 的 validator 参数不兼容

import { isMobile } from './utils';

export function checkMobile(val) {
  return isMobile(val);
}
