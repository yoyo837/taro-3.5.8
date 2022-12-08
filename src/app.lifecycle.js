import { nextTick } from '@tarojs/taro';
import { useGlobalStore } from './stores';

// srvInfo 需要是响应式的, 之所以写在这里, 是因为app.js禁用了eslint
export default srvInfo => {
  return {
    onShow() {},
    onLaunch(options) {
      const { srvId } = options.query;
      const useSrvId = +srvId || null;
      if (useSrvId > 0) {
        // 让 pluginsSetup 完成
        nextTick(() => {
          this.$http
            .get(`/srv${useSrvId}/api/pub/basic/getConfig`)
            .then(data => {
              // 初始化服务器时间
              const globalStore = useGlobalStore();
              globalStore.setServerTime(data?.serverTime);
              // 写srvInfo
              Object.assign(srvInfo, data || {}, {
                srvState: 1,
              });
            })
            .catch(() => {
              srvInfo.srvState = -1;
            });
        });
      } else {
        srvInfo.srvState = -1;
      }
    },
  };
};
