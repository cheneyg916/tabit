# 公用类库打包模板

```
该模板建议应打包使用于浏览器的类库，为了保持依赖的一致性， 防止出现yarn.lock 和 package-json.lock线上和本地执行脚本不一致的问题, 强制使用yarn安装依赖，使用npm脚本会自动退出
```

## 特性

-   使用 typescript 进行开发
-   使用 jest 进行测试
-   使用 enzyme 测试 react
-   使用 lerna 进行项目内包依赖管理, 版本管理，发布
-   使用 postcss 同时兼容 less scss 处理 (建议使用 styled-components)
-   使用 prettier 统一格式化代码
-   采用 rollup 构建 打包代码更加轻量化
-   使用 precommit 钩子自动 Lint、格式化代码

## 构建与发布说明

### 安装

进入到项目根目录，安装依赖。（自动安装子项目依赖）

```
yarn install
```

### 开发

开启 rollup dev 模式

```
yarn watch
```

### 发布

1. 首先必须要有 git 远程仓库，且 commit 过代码，否则无法构建。该步骤为必须操作。

```
git commit -am 'your message'
```

2. 构建且发布到 npm 镜像

```
yarn release
```

3. 版本选择规范
   `不要手动更改package.json version字段，通过发布工具来手动升级`

```
patch 增加0.0.1 即为小缺陷修复 优化 不得增加任何功能 （该版本不许影响原有代码）
minor 增加0.1.0 增加功能点 但不可变化原有任何api 不得改动原有代码
major 增加1.0.0 可有api变化 可更改原有代码
Prepatch (0.0.1-alpha.0)  patch的预发布,非正式版本，尝鲜用。
Preminor (0.1.0-alpha.0)  minor的预发布，非正式版本，尝鲜用。
Premajor (1.0.0-alpha.0)  major的预发布，非正式版本，尝鲜用。
```

## 开发说明

1. *packages*目录下面的每个目录，都代表一个 npm 包，或者私有的公用工具。
   例如*packages/demo*这个包，即可理解为即将发布的一个 npm 包。(这个包是演示用的，不要发布，自己看过后，请删除)。:
   复制一份之后，即把文件夹名，还有 package.json 里的 name 字段,umdName 字段，改成自己的包名。
   umdName 不要加前缀，是作为 global 全局变量的导出名。
   如果 package.json 的 name 字段是@xmly/component 那 umd 名称是 xmlyComponent(随意)即可。

该目录作为一个初始化模板，每当开发新包，应该根据 demo 在 packages 目录下复制出一份。

2. 公约规定*入口文件*必须为*src/index.ts*，不得更改文件名，不得更改后缀。
3. test 目录为测试脚本目录。
4. readme 作为类库文档说明，建议尽量填写。
5. lib 目录是打包后的类库存放地方，不需要关心其生成。通常，如果开发 react 组件，会打包出 index.css 和 index.js。需要使用方都引入。
6. 样式文件，无论是 css 还是 pcss,less,scss 等，一样在引入时使用后缀名，如`import './global.scss'`

## FAQ

1. 如何在浏览器里 debug?

watch 模式会开启 sourceMap,方便在浏览器里 debug。

2. 如何验证开发？如何所见即所得？（热更新）
   watch 模式构建后，命令行进入到要调试验证的包下面比如 packages/demo。

```
yarn link  (即packages/demo/package.json的name字段)
```

随后进入要到引入该包的项目 `yarn link @xmly/demo`

## 项目依赖 ✍✍✍

---

1.  **_TypeScript_** 及相关配置(Eslint,Tslint,Jest,Prettier 等) - 统一开发规范
2.  **_Redux_** 数据依存
3.  **_Mobx_** 控制组件**_业务数据及状态_**控制
4.  **_生命周期组件_** 与**_业务数据无关的 state_**状态控制
5.  **_无状态组件_** 傻瓜组件，只做数据渲染
6.  **_待补充_**

---

# react 组件设计原则

## 职责清晰

多个组件协同完成一件事情，而不是一个组件替其他组件完成本该它自己完成的事情。例如

```
<Menu> // menu1
<MenuItem></MenuItem>
<SubMenu>
<Menu> // menu2
</Menu>
</SubMenu>
</Menu>
```
menu1 只应该关心当前 children 中谁是当前高亮项（active），而不应该关注 SubMenu 是否应该展开子菜单（SubMenu 应该由自己是否是 active 决定是否展开子菜单）

## 扁平访问

组件推荐使用状态来控制交互和显示，如果需要显示访问，也尽量实行扁平访问，即只可以调用其 children 的方法。

## 信息冗余

尽量避免信息冗余，如果某个 state 可以由其他 state 计算得到，那么就删除这个 state

## 避免使用 ref

使用父组件的 state 控制子组件的状态而不是直接通过 ref 操作子组件

## js 编码规范

### 文件命名

-   js 模块采用 es2015 格式，主体代码放在 src 目录下，根目录 index.ts 仅引用 src 下相关文件
-   若用到了 jsx 语法或 es6 特性，文件后缀名请改做 tsx，文件内请不要包含 `/** @jsx React.DOM */`
-   src 目录模块如果返回值是个类，则文件名首字母大写
-   测试用例文件名以 .spec.ts(tsx) 结尾
-   测试用例文件名推荐和 src 下源码对应，比如 src/demo.jsx 对应于 tests/demo.spec.tsx
-   测试用例入口文件名为 index.spec.ts

### 代码格式

-   只能 import 'react' 不可以 import 'react/lib/xx'
-   禁止使用 jquery 等大而全的类库
-   React 类必须用一个变量声明

### eslint

代码通过 eslint（在根目录运行 `yarn run lint`），具体规范参见: https://github.com/airbnb/javascript

# 最佳实践

1. Don’t Repeat Yourself
2. Keep components small and function-specific
3. Put CSS in JavaScript ？？？ css in js ?? TBD
4. Code should execute as expected and be testable（朝着可测试的方向写代码出 bug 的几率将会无限趋近于 0）
5. TBD...
