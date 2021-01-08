

// vue.config.js
const vueConfig = {
  devServer: {
    // development server port 8000
    port: 8083,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      '/': {
        target: 'http://39.105.58.170:8080/server/api',
        // target: 'http://192.168.1.149:8080/server/api',
        ws: false,
        changeOrigin: true
      }
    }
  }
}
module.exports = vueConfig
