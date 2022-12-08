# ydmap-portal-front 开发准则

## 小程序跨端 uni-app 和 Taro 比选为什么选择后者

### uni-app

1. 优点在于起步早，想对更成熟；
2. 公司营收模式单一，有封闭或者付费风险比如早先只能在线付费编译；
3. 社区活跃度相对高，但核心代码活跃度不明显；社区里更多是嗷嗷待哺诉求解决问题的人，社区贡献 PR 300 左右，开发者更集中于 DCloud 公司本身的雇员;
4. 开发体验提升依赖自有的 HBuilder 程度较高, 插件需要二次对接，比如 Vue3 的 Volar 支持还未到位；

### Taro

1. 起步晚，相对稚嫩；
2. 背靠京东，不担心持续性问题而改变项目性质；
3. 更符合开源和社区贡献特征，社区活跃度可见，核心代码活跃度也可见并且高于前者的活跃度，晚起步的 Taro 代码 commits 数量目前已经和 uni-app 旗鼓相当；社区贡献 PR 接近 3000；
4. 可以使用任意编辑器根据自己需要来配置来提升开发体验；编辑器、开发工具及插件生态完全直接依赖开放社区；

> uniapp 的跨端实现有较多“魔改”的手段, 可能对开发人员本身基础认知带来困扰并影响二次开发的能力, Taro 的实现没有这个问题;
> 只要目前 Taro 能满足基本跨小程序+H5 的应用，没有大坑直接用不了，就可以考虑，综合来看远期更好看 Taro 的发展；

## 以小程序为中心

Portal 按多端开发（h5+小程序），我们准备以小程序兼容为主，h5 为辅。
因为小程序环境要求更苛刻，能用的特征范围更小，木桶效应。
除此之外，也可以按需要，区分同一个功能在 h5 和小程序的实现为不同效果（分开实现）。

生命周期函数优先使用平台打平的 API，其他情况单独使用或混用小程序、Vue 的生命周期 API。

## 不考虑兼容 SSR

基于之前 ssr-portal 的历史以及和老板的沟通，放弃 SSR 的兼容需求。

## 路由

平台暂未实现兼容小程序的 History API，History API 只 h5 端可用。
编程式路由使用平台的 API 统一处理。[文档](https://docs.taro.zone/docs/router), [h5 路由](https://docs.taro.zone/docs/h5#%E8%B7%AF%E7%94%B1)

## app

以小程序为中心使用平台 API 优先。[文档](https://docs.taro.zone/docs/vue-entry), 暂不需要支持app;

## 页面

以小程序为中心使用平台 API 优先。[Options API](https://docs.taro.zone/docs/vue-page), [Composition API](https://docs.taro.zone/docs/composition-api)

## 与设计师对稿规范

与设计师对稿时以 375 分辨率满足逻辑像素值规范为准。

## 一些实践经验

1. 打开多个 command 窗口分别运行不同端，多端同时预览；比如一个运行 `npm run dev:h5`, 一个运行 `npm run dev:weapp`; weapp 的预览需要打开微信开发者工具导入(直接预览，不要执行编译)；
2. json 配置文件修改，必须重新执行 dev, 否则各端可能不生效；
3. 新增和删除页面时及其配置时，最好重新执行 dev, 否则各端可能不生效；
4. 如果小程序之前正常莫名警告 `/base.wxml:template Template 'tmpl_0_13' not found.` 等问题, 可能与 webpack filesystem cache 有关, 删除 cache 文件夹或者整个 `node_modules` 重新安装后再尝试;

## 之前 ydmap-web-portal 中的一些设计，在这里可能无法适用

1. ui 满足独立抽取组件库的需求已经无法完全满足;
2. tailwindcss 可以支持，但功能受限;
3. vant ui 没有官方跨端支持，分别有 h5、小程序版本库，但需要手动分别适配抹平，成本较高，改为使用支持跨端的第三方库 nutui；
4. 多主题需要紧密围绕对第三方库的修饰和新功能补充来实现，对 awc 侧来说仍然保留沿用变量实现新组件的形式；

## 其他遗留问题

1. CSS scoped 暂不支持 [点这里](https://github.com/NervJS/taro/issues/6662), 暂时使用 css module 代替, 直到前面的问题修复
