# Error Boundary Reporter

基于 React ErrorBoundary 封装的错误处理上报组件

## 代码演示

### 基本用法

直接将本组件作为 container 组件即可.

```jsx
<ErrorBoundaryReporter project="XDCS3.0" baseBackupUrl="http://xdcshera.ximalaya.com/v3/home">
  ...
</EErrorBoundaryReporter>
```

### 基本功能

- 自动捕获组件错误,降级跳转到备用地址
- 错误自动上传并发报警通知

## 参数

```jsx
  baseBackupUrl?: string,
  fallbackComponent?: ReactElement,
  isAutoJump?: boolean,
  project: string,
  children: ReactNode,
```

### 参数说明

| 参数              | 说明                                                        | 类型      | 默认值  |
| :---------------- | ----------------------------------------------------------- | --------- | ------- |
| baseBackupUrl     | 该地址会作为跳转的 base 地址,自动拼接出错页面的 hash 值跳转 | string    | -       |
| fallbackComponent | 可选参数,报错时显示的替换组件                               | string    | -       |
| isAutoJump        | 是否开启自动跳转                                            | boolean   | true    |
| project           | 项目名,必须输入用来识别上报                                 | string    | default |
| children          | 子组件,必须参数                                             | ReactNode | -       |
