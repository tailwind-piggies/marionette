module.exports = {
  title: 'marionette',
  stylus: {
    use: [
      require('@xhs/yam-style/stylus-plugin') // eslint-disable-line
    ]
  },
  server: {
    proxies: {
      '/*api/**': {
        changeOrigin: true,
        target: 'http://localhost:10080',
        secure: false
      }
    }
  }
}
