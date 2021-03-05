const express = require("express");
const path = require("path");
const ReactDomServer = require("react-dom/server");
const { ApolloProvider } = require("@apollo/client");
const { getDataFromTree } = require("@apollo/client/react/ssr");
const { StaticRouter } = require("react-router");
const React = require("react");
import { ThemeProvider } from "theme-ui";
const compression = require("compression");
const client = require("./api").default;
const { hashira } = require("./client/theme");
const Layout = require("./client/Layout").default;

const app = express();
app.use(compression());
const port = process.env.PORT || 3000;

const getDoc = ({ content, state }) =>
  `<!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
        rel="stylesheet"
        link rel="preload"
        as="style"
      />
      <title>Pokemon</title>
    </head>
    <body>
      <div id="app">
        ${content}
        </div>
      <script type="text/javascript">window.__APOLLO_STATE__=${JSON.stringify(
        state
      )}</script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>`;

app.use("/static", express.static(path.join(__dirname, "..", "public")));
app.use((req, res) => {
  const context = {};
  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={hashira}>
          <Layout />
        </ThemeProvider>
      </StaticRouter>
    </ApolloProvider>
  );
  getDataFromTree(App).then(() => {
    const initialState = client.extract();
    const content = ReactDomServer.renderToString(App);
    res.send(getDoc({ content, state: initialState }));
  });
});
app.listen(port, () => console.log(`Pokeapp listening on port ${port}!`));
