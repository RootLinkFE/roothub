const path = require('path');
const Mode = require('frontmatter-markdown-loader/mode')

module.exports = {
    chainWebpack: config => {
        config.module
          .rule('markdown')
          .test(/\.md$/)
          .use('frontmatter-markdown-loader')
            .loader('frontmatter-markdown-loader')
            .tap(options => {
              return {
                mode: [Mode.VUE_COMPONENT]
              }
            })
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
                                    path.resolve(__dirname, './src/style/variables.less')
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
};
