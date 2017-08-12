const path = require('path')
const webpack = require('webpack')
const express = require('express')

const config = require('./webpack.config')
const app = express()
const compiler = webpack(config)

const IS_CONNECTED = process.argv.includes("--connected", "-c")

const faker = {
  initial: {
    endpoint: "http://localhost:3000",
  },
  run: {
    endpoint: "http://localhost:3000",
    url: "https://www.arquivei.com.br",
    list: [{
      name: 'Foo',
      selector: '.col-lg-12',
      value: `<div class="col-lg-12" data-reactid=".0.1.1.0"><div class="card" data-reactid=".0.1.1.0.0"><div class="card-body" data-reactid=".0.1.1.0.0.0"><strong data-reactid=".0.1.1.0.0.0.0">&lt;Foo&gt; </strong><span data-reactid=".0.1.1.0.0.0.1">".col-lg-12":</span></div></div></div>`,
    }, {
      name: 'Boo',
      selector: '#modal-pre',
      value: `<div class="col-lg-12" data-reactid=".0.1.1.0"><div class="card" data-reactid=".0.1.1.0.0"><div class="card-body" data-reactid=".0.1.1.0.0.0"><strong data-reactid=".0.1.1.0.0.0.0">&lt;Foo&gt; </strong><span data-reactid=".0.1.1.0.0.0.1">".col-lg-12":</span></div></div></div>`,
    }]
  },
  save: {
    endpoint: "http://localhost:3000",
    data: [{
      url: "https://www.arquivei.com.br",
      list: [{
        name: 'Foo',
        selector: '.col-lg-12',
        value: `<div class="col-lg-12" data-reactid=".0.1.1.0"><div class="card" data-reactid=".0.1.1.0.0"><div class="card-body" data-reactid=".0.1.1.0.0.0"><strong data-reactid=".0.1.1.0.0.0.0">&lt;Foo&gt; </strong><span data-reactid=".0.1.1.0.0.0.1">".col-lg-12":</span></div></div></div>`,
      }, {
        name: 'Boo',
        selector: '#modal-pre',
        value: `<div class="col-lg-12" data-reactid=".0.1.1.0"><div class="card" data-reactid=".0.1.1.0.0"><div class="card-body" data-reactid=".0.1.1.0.0.0"><strong data-reactid=".0.1.1.0.0.0.0">&lt;Foo&gt; </strong><span data-reactid=".0.1.1.0.0.0.1">".col-lg-12":</span></div></div></div>`,
      }]
    }, {
      url: "https://www.elo7.com.br",
      list: [{
        name: 'Foo',
        selector: '.col-lg-12',
        value: `<div class="col-lg-12" data-reactid=".0.1.1.0"><div class="card" data-reactid=".0.1.1.0.0"><div class="card-body" data-reactid=".0.1.1.0.0.0"><strong data-reactid=".0.1.1.0.0.0.0">&lt;Foo&gt; </strong><span data-reactid=".0.1.1.0.0.0.1">".col-lg-12":</span></div></div></div>`,
      }, {
        name: 'Boo',
        selector: '#modal-pre',
        value: `<div class="col-lg-12" data-reactid=".0.1.1.0"><div class="card" data-reactid=".0.1.1.0.0"><div class="card-body" data-reactid=".0.1.1.0.0.0"><strong data-reactid=".0.1.1.0.0.0.0">&lt;Foo&gt; </strong><span data-reactid=".0.1.1.0.0.0.1">".col-lg-12":</span></div></div></div>`,
      }]
    }]
  },
}

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.all('*', function(req, res) {
  let body

  if (IS_CONNECTED) {
    res.render('index', { initial: JSON.stringify(body) })
  } else if (req.path === "/run") {
    res.render('index', { initial: JSON.stringify(faker.run) })
  } else if (req.path === "/save") {
    res.render('index', { initial: JSON.stringify(faker.save) })
  } else {
    res.render('index', { initial: JSON.stringify(faker.initial) })
  }
})

app.listen(3000, function(err) {
  if (err) {
    return console.error(err)
  }

  console.log('Listening at http://localhost:3000/')
})
