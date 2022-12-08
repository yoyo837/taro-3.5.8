import { ref, watch } from 'vue';
import { getBoundingClientRectAsync } from '@/utils/utils';
import { nextTick, useReady } from '@tarojs/taro';

export default domRef => {
  const result = ref({
    rect: null,
    getBoundingClientRectAsync(r) {
      return getBoundingClientRectAsync(r.value);
    },
  });
  const ready = ref();
  useReady(() => {
    ready.value = true;
  });
  watch([domRef, ready], ([newDomValue, newReadyValue]) => {
    if (newDomValue == null) {
      result.value.rect = null;
      return;
    }
    if (newReadyValue) {
      nextTick(() => {
        getBoundingClientRectAsync(newDomValue).then(data => {
          result.value.rect = data;
        });
      });
    }
  });
  return result;
};
