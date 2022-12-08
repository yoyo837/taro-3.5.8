import { inject } from 'vue';
import { isStartsWithProtocol } from '@/utils/utils';

function buildSrvPrefix(url, srvId) {
  if (url == null) {
    return null;
  }
  if (isStartsWithProtocol(url)) {
    return url;
  }
  return `/srv${srvId > 0 ? srvId : 0}/api${url}`;
}

function check(srvId) {
  if (srvId > 0) {
    return;
  }
  throw new Error('srvInfo 尚未初始化');
}

export default () => {
  const srvInfo = inject('$srvInfo');
  const { get, post, postJSON } = inject('$global');
  return {
    get(url, ...args) {
      check(srvInfo.srvId);
      return get(buildSrvPrefix(url, srvInfo.srvId), ...args);
    },
    post(url, ...args) {
      check(srvInfo.srvId);
      return post(buildSrvPrefix(url, srvInfo.srvId), ...args);
    },
    postJSON(url, ...args) {
      check(srvInfo.srvId);
      return postJSON(buildSrvPrefix(url, srvInfo.srvId), ...args);
    },
  };
};
