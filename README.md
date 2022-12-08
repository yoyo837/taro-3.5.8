# ydmap-portal-front

如果使用 **Visual Studio Code** 作为开发工具

> 请在设置中将文件夹图标主题设置为 **vscode-icons** ，将颜色主题设置为 **Dark+ (default dark)**

推荐安装的扩展有:

- vscode-icons
- sass
- path Intellisense
- npm Intellisense
- npm
- JavaScript(ES6) code snippets
- HTML Snippets
- HTML CSS Support
- ESLint
- TSLint
- stylelint
- EditorConfig for VS Code
- Auto Close Tag
- Todo Tree
- Start git-bash
- markdownlint
- GitLens — Git supercharged
- Prettier - Code formatter
- Tailwind CSS IntelliSense
- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)
- nutui-vscode-extension

也可选择命令行执行扩展安装(确保已经安装 **Visual Studio Code** )

```shell
code --install-extension vscode-icons-team.vscode-icons
code --install-extension robinbentley.sass-indented
code --install-extension christian-kohler.path-intellisense
code --install-extension christian-kohler.npm-intellisense
code --install-extension eg2.vscode-npm-script
code --install-extension xabikos.JavaScriptSnippets
code --install-extension abusaidm.html-snippets
code --install-extension ecmel.vscode-html-css
code --install-extension dbaeumer.vscode-eslint
code --install-extension ms-vscode.vscode-typescript-tslint-plugin
code --install-extension stylelint.vscode-stylelint
code --install-extension EditorConfig.EditorConfig
code --install-extension formulahendry.auto-close-tag
code --install-extension gruntfuggly.todo-tree
code --install-extension McCarter.start-git-bash
code --install-extension DavidAnson.vscode-markdownlint
code --install-extension eamodio.gitlens
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
code --install-extension Vue.volar
code --install-extension Vue.vscode-typescript-vue-plugin
code --install-extension nutui.nutui-vscode-extension
```

安装好扩展后重启 **Visual Studio Code** ,点击菜单栏 **文件** - **首选项** - **文件图标主题** ,选择前面安装的 **VSCode Icons**

## Installation 安装

开发工具集基于 **node.js** 环境，node.js 以 **package** 的概念定义一个具体的功能集合,所有 node.js 应用程序都是一个 package。
node.js 自带包管理工具 [npm](https://www.npmjs.com/)

首次使用请先按以下引导步骤初始化开发环境：

1.首先安装 [node.js](https://nodejs.org)

> 如果过程中出现 **git** 字样的异常信息,可能是因为 **package.json** 的依赖模块关系中有不是使用 **npm** 包管理方式而是直接使用 **git** 管理方式从仓库如 github 拉取的模块,则需要额外安装 **git** 工具 [git-scm](https://git-scm.com/) ,选择合适的版本安装. [tortoisegit](https://tortoisegit.org/) ( **git** 桌面管理工具,可选)

2.命令行定位到项目 **package.json** 所在目录即根目录执行

```shell
npm i
```

3.依赖的包解析及下载完成后即可使用

### 在开发时编译并热重载

```shell
npm run dev:h5
npm run dev:weapp
```

### 部署打包并最小化压缩

```shell
npm run build
```

### 代码检查和修复

```shell
npm run lint
```

### TODO List

1. jsencrypt 改为 postinstall 从安装包里动态复制
