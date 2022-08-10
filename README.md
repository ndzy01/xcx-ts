# xcx-ts

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/node-61khrt)

## `@tarojs/plugin-html`

1. `@tarojs/plugin-html` 安装在开发依赖
2. 版本要和 `@tarojs/taro` 一致
3. 去除 `@tarojs/plugin-html` 版本前面的`^`

## h5 开发环境代理配置

```js
const json = {
  // 配置在 h5 下面
  devServer: {
    host: 'localhost',
    port: 10086,
    proxy: {
      '/ndzy': {
        target: 'https://www.yuque.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '/ndzy': '' },
      },
    },
  },
};
```
