import { readonly, ref, onDeactivated } from 'vue';
import { useGlobalStore } from '@/stores';

export default function () {
  const globalStore = useGlobalStore();
  const serverTime = ref(0);
  const timeId = ref();
  //
  const timer = ref(() => {
    serverTime.value = globalStore.getCurrentServerTime();
    timeId.value = setTimeout(timer.value, 1000 * 1);
  });
  onDeactivated(() => {
    if (timeId.value) {
      clearTimeout(timeId.value);
    }
  });
  timer.value();
  return readonly(serverTime);
}
