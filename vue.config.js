const path = require('path');
const Mode = require('frontmatter-markdown-loader/mode');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('frontmatter-markdown-loader')
      .loader('frontmatter-markdown-loader')
      .tap((options) => {
        return {
          mode: [Mode.VUE_COMPONENT],
        };
      });

    config.resolve.alias.set('@$', resolve('src'));
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [
            {
              loader: 'style-resources-loader',
              options: {
                patterns: [
                  path.resolve(__dirname, './src/style/variables.less'),
                  path.resolve(__dirname, './src/style/mixin.less'),
                ],
              },
            },
          ],
        },
      ],
    },
  },
};
