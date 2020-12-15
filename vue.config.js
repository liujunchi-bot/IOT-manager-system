module.exports = {
  assetsDir: 'static',
  publicPath: './',
  devServer: {
    open: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:8080',
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      sass: {
        // 新版本sass-loader， 将data改成prependData进行配置
        data: `@import "@/assets/scss/_variable.scss";`
      }
    }
  }
}
