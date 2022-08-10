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
      root: 'subPackages/yuque/',
      pages: [
        'pages/docsSearch/index',
        'pages/docs/index',
        'pages/docDetail/index',
      ],
    },
  ],
};
