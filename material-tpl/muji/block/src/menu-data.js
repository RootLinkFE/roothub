export default [
  {
    path: '/welcome',
    icon: 'smile',
    title: '欢迎',
  },
  {
    path: '/page1',
    icon: 'file',
    title: '页面1',
  },
  {
    path: '/page2',
    icon: 'file',
    title: '页面2',
  },
  {
    path: '/dir1',
    title: '目录',
    icon: 'file',
    children: [
      {
        path: '/dir1/page1',
        title: '子页面1',
      },
      {
        path: '/dir1/page2',
        title: '子页面2',
      },
    ],
  },
  // 外链菜单
  {
    path: 'http://wireless.souche-inc.com/#/',
    target: '_blank',
    icon: 'star',
    title: '无线研发门户',
  },
];
