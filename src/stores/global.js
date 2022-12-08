import { defineStore } from 'pinia';

export default defineStore('global', {
  state: () => ({
    // 客户端于服务器时钟偏移量（毫秒）
    duration: 0,
  }),
  getters: {
    getCurrentServerTime: state => {
      return () => Date.now() - state.duration;
    },
  },
  actions: {
    setServerTime(time) {
      const now = Date.now();
      const serverTime = time == null ? now : time;
      this.duration = now - serverTime;
    },
  },
});
