import {
  Button,
  Toast,
  Icon,
  Avatar,
  Tabs,
  TabPane,
  Row,
  Col,
  Divider,
  OverLay,
  Tag,
  Form,
  FormItem,
  Cell,
  CellGroup,
  Input,
  TextArea,
  Popup,
  Uploader,
  Progress,
} from '@nutui/nutui-taro';

import AccessLoadingHolder from '@/components/common/AccessLoadingHolder.vue';
import PageLayout from '@/components/common/PageLayout/index.vue';
import PageLink from '@/components/common/PageLink.vue';
import Iconfont from '@/components/common/Iconfont.vue';
import Card from '@/components/common/Card.vue';
import FixFoot from '@/components/common/FixFoot.vue';
// eslint 配置为要求强制 .vue 后缀, 这里不加 .vue 是因为 https://taro-docs.jd.com/taro/docs/envs#%E5%A4%9A%E7%AB%AF%E7%BB%84%E4%BB%B6
// eslint-disable-next-line import/extensions, import/no-unresolved
import NeVerify from '@/components/common/NeVerify';
// eslint 配置为要求强制 .vue 后缀, 这里不加 .vue 是因为 https://taro-docs.jd.com/taro/docs/envs#%E5%A4%9A%E7%AB%AF%E7%BB%84%E4%BB%B6
// eslint-disable-next-line import/extensions, import/no-unresolved
import AMap from '@/components/common/AMap';

export default app => {
  app
    .use(Button)
    .use(Uploader)
    .use(Progress)
    .use(Toast)
    .use(Icon)
    .use(Avatar)
    .use(Tabs)
    .use(TabPane)
    .use(Row)
    .use(Col)
    .use(Popup)
    .use(Divider)
    .use(OverLay)
    .use(Tag)
    .use(Cell)
    .use(CellGroup)
    .use(Input)
    .use(TextArea)
    .use(Form)
    .use(FormItem);

  // 自定义全局组件
  app.component('AccessLoadingHolder', AccessLoadingHolder);
  app.component('PageLayout', PageLayout);
  app.component('PageLink', PageLink);
  app.component('Iconfont', Iconfont);
  app.component('Card', Card);
  app.component('FixFoot', FixFoot);
  app.component('NeVerify', NeVerify);
  app.component('AMap', AMap);
};
