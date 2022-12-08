import { nextTick } from '@tarojs/taro';
import { inject, watch } from 'vue';

export default fn => {
  const srvInfo = inject('$srvInfo');
  if (srvInfo.srvState > 0) {
    fn?.();
    return;
  }
  const stop = watch(srvInfo, val => {
    if (val.srvState > 0) {
      stop();
      nextTick(() => {
        fn?.();
      });
    }
  });
};
