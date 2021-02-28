const express = require('express')
const path = require('path')
// const webpack = require('webpack')
// const webpackConfig = require('../webpack.config')
// const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require('webpack-hot-middleware')
const ReactDomServer = require('react-dom/server')
const App = require('./client/App').default

// const webpackCompiler = webpack(webpackConfig)

const app = express()
const port = 3000

// app.use(webpackDevMiddleware(webpackCompiler))
// app.use(webpackHotMiddleware, {path : '/__wpk_hmr'})

app.get('/', function(_, res) {
  console.log('------------------------------------');
  console.log('test', {App});
  console.log('------------------------------------');
  const component = ReactDomServer.renderToString(App)
  console.log({component});
  const html = `
    <doctype html>
    <html>
      <body>
        <div id="app">
          ${component}
        </div>
        <script src="/static/bundle.js">
        </script>
      </body>
    </html>
  `
  res.send(html);
});
app.use('/static', express.static(path.join(__dirname,'..', 'public')))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
