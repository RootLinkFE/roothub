const config = async () => ({
  css: {
    modules: true,
  },
  plugins: [
    [
      // sso 插件，文档参考 http://muji.dasouche-inc.net/plugins/muji-plugin-sso.html
      '@souche-f2e/muji-plugin-sso',
      {
        forceRedirect: true,
      },
    ],
  ],
});
export default config;
