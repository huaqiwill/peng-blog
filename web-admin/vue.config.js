const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  //
  transpileDependencies: true,
  //
  productionSourceMap: false,
  // 服务
  devServer: {
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9015',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  //
  chainWebpack: (config) => {
    config.resolve.alias.set('@', resolve('src'))
  }
})
