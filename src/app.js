// FIXME: 本文件暂时在 .eslintignore 配置忽略了eslint检查, 因为:
// 1. @dcasia/mini-program-tailwind-webpack-plugin 的用法不支持使用 import 'windi.css' 的文件 打开 eslint 检查
// 2. 此文件修改的概率较低, 可以暂时这样干;
// https://github.com/dcasia/mini-program-tailwind/issues/71
import { createApp, reactive, readonly } from 'vue';
import { createPinia } from 'pinia';
import lifecycle from './app.lifecycle.js';
import pluginsSetup from './plugins';
// windicss
// 实际文件不在目录, 这种用法目前不支持 eslint, 如果启用, eslint 及 eslint-webpack-plugin 等可能不能按预期正常工作
import 'windi.css';
import './app.scss';

const srvInfo = reactive({
  // 所有字段都声明处理,避免不触发重新渲染
  authPlatform: null,
  cardTypes: null,
  customService: null,
  isCertification: null,
  isInvoiceApplication: null,
  isOnlineRecharge: null,
  loginTypes: null,
  regPwdLimit: null,
  regUserAgreement: null,
  serverTime: null,
  srvDescription: null,
  srvHiddenMenu: null,
  srvId: null,
  srvKeywords: null,
  srvName: null,
  srvPageId: null,
  thirdAuthUrl: null,
  // 自定义的, 1, 有效, -1 无效, 0 待查询
  // 有数据后会被覆盖
  srvState: 0,
  isAvailableMenu: () => false,
});

const app = createApp(lifecycle(srvInfo));

app.use(createPinia());
app.provide(
  '$srvInfo',
  readonly(
    Object.assign(srvInfo, {
      isAvailableMenu: menuEnumKey => {
        if (srvInfo == null || srvInfo.srvState === 1 || !menuEnumKey) {
          return false;
        }
        return !(srvInfo.srvHiddenMenu || []).includes(menuEnumKey);
      },
    })
  )
);

pluginsSetup(app);

export default app;
