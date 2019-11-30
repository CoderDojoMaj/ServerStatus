import fs from 'fs'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { router } from './index'

const config = require('../../webpack.dev.config.js')

const app = express()
const DIST_DIR = __dirname
const HTML_FILE = path.join(DIST_DIR, 'index.html')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.get('/', (req, res, next) => {
  (compiler.outputFileSystem as any as typeof fs).readFile(HTML_FILE, (err, result) => {
    if (err) return next(err)

    res.send(result)
  })
})

// Actual server routes
app.use('/', router)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}....`)
})
