const express = require('express')
const path = require('path')
const ReactDomServer = require('react-dom/server')
const App = require('./client/App').default

const app = express()
const port = 3000

app.get('/', function(_, res) {
  const component = ReactDomServer.renderToString(App)
  console.log({component});
  const html = `
    <doctype html>
    <html>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
        <title>
          Pokemon
        </title>
      </head>
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
