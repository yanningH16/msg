var express = require('express')
var proxy = require('http-proxy-middleware')
var history = require('connect-history-api-fallback')
// var config = require('./config/index')
var app = express()
app.use('/api', proxy({
  target: 'http://116.62.136.130:8093',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}))
// app.use('/upload', proxy({
//   target: 'http://118.31.72.73:8086',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/upload': ''
//   }
// }))
// app.use('/other', proxy({
//   target: 'http://118.31.72.73:8091',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/other': ''
//   }
// }))
app.use(history({
  index: './index.html'
}))
app.use(express.static('./dist'))
// var port = process.env.PORT || config.build.port
var port = 8889
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
