var path = require('path')
var webpack = require('webpack')
var express = require('express')
var { renderToString } = require('react-dom/server')

var config = require('./webpack.config')
var app = express()
var compiler = webpack(config)

app.set('view engine', 'ejs')

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('*', function(req, res) {
  res.render('index', {
    initial: JSON.stringify({
      result: 'Value from scrapper here',
    }),
  })
})

app.listen(3000, function(err) {
  if (err) {
    return console.error(err)
  }

  console.log('Listening at http://localhost:3000/')
})
