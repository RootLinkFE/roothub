let path = require('path');

module.exports = {
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
