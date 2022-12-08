import { platformIsWeApp } from './env';

const appStore = {};

const sessionStore = appStore;

const isomorphismAppStore = platformIsWeApp
  ? {
      has(key) {
        const value = this.get(key);
        return value != null;
      },
      get(key) {
        const value = wx.getStorageSync(key);
        if (value === '') {
          return null;
        }
        try {
          return JSON.parse(value);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(error);
        }
        return null;
      },
      put(key, value) {
        wx.setStorageSync(key, JSON.stringify(value));
      },
      remove(key) {
        wx.removeStorageSync(key);
      },
      clear() {
        wx.clearStorageSync();
      },
    }
  : appStore;

const isomorphismSessionStore = platformIsWeApp ? isomorphismAppStore : sessionStore;

export { isomorphismAppStore as appStore, isomorphismSessionStore as sessionStore };
