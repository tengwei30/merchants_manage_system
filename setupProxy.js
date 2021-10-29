const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/*',
    createProxyMiddleware({
      target: 'http://localhost',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        // 请求中去除/api
        '^/api': ''
      }
    })
  )
}
