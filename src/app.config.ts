export default {
  pages: ['pages/index/index'],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  subPackages: [
    {
      root: 'subPackages/yuque/docs/',
      pages: ['pages/docsSearch/index', 'pages/docs/index'],
    },
  ],
};
