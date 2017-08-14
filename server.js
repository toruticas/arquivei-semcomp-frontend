import React from 'react'
import { createStore } from 'redux'

const path = require('path')
const webpack = require('webpack')
const express = require('express')
const bodyParser = require('body-parser')
const fs = require("fs")
const { renderToStaticMarkup } = require("react-dom/server")
const { Provider } = require("react-redux")

import App from "./src/App"
import reducers from './src/store/reducers'

const config = require('./webpack.config')
const app = express()
const compiler = webpack(config)

const IS_CONNECTED = process.argv.includes("--connected", "-c") || process.argv.includes("-c")

if (IS_CONNECTED) {
  console.log("Server is connected to backend");
}

const faker = {
  initial: {
    endpoint: "http://localhost:3000",
  },
  run: {
    id: "",
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
      id: "1",
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
      id: "2",
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

const banner = new Buffer(fs.readFileSync("public/BannerSemComp.png")).toString('base64')
const bgImage = new Buffer(fs.readFileSync("public/PatternSemCompbranco.png")).toString('base64')
let bundle = IS_CONNECTED ? fs.readFileSync("public/bundle.js") : ""

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.json())

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath
}))

app.use(require('webpack-hot-middleware')(compiler))

app.all('*', function(req, res) {
  let content, state = {}

  if (IS_CONNECTED) {
    state = { initial: req.body }
  } else if (req.path === "/run") {
    state = { initial: faker.run }
  } else if (req.path === "/save") {
    state = { initial: faker.save }
  } else {
    state = { initial: faker.initial }
  }

  if (state.initial.list && state.initial.list.length) {
    state.initial.listMirror = JSON.parse(JSON.stringify(state.initial.list))
  }

  if (state.initial.url && state.initial.url.length) {
    state.initial.urlMirror = JSON.parse(JSON.stringify(state.initial.url))
  }

  global.window = { "__BANNER_IMG_BASE64__": `data:image/png;base64,${banner}` }

  content = renderToStaticMarkup(
    <Provider store={createStore(reducers, state.initial)}>
      <App />
    </Provider>
  )

  state.initial = JSON.stringify(state.initial)

  res.render('index', Object.assign(state, { banner, bgImage, bundle, content }))
})

app.listen(3000, function(err) {
  if (err) {
    return console.error(err)
  }

  console.log('Listening at http://localhost:3000/')
})
