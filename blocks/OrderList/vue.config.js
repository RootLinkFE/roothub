module.exports = {
  outputDir: 'build',
  publicPath: './',
  chainWebpack: (config) => {
    config
      .entryPoints.clear()
      .end()
      .entry('main')
      .add('./main.js')
      .end();
  },
};
