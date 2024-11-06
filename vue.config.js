const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    hot: false,
    liveReload: false,
    port: 8099
  }  
})
 