const express = require("express");
const path = require("path");
const ReactDomServer = require("react-dom/server");
const { ApolloProvider } = require("@apollo/client");
const { getDataFromTree } = require("@apollo/client/react/ssr");
const { StaticRouter } = require("react-router");
const { Global } = require("@emotion/core");
const { Switch, Route } = require("react-router-dom");
const React = require("react");
import { ThemeProvider } from "theme-ui";
const client = require("./api").default;
const { hashira } = require("./client/theme");
const Layout = require("./client/Layout").default;

const app = express();
const port = 3000;

const Html = ({ content, state }) => (
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
        rel="stylesheet"
      />
      <title>Pokemon</title>
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
      <script src="/static/bundle.js" />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            /</g,
            "\\u003c"
          )};`,
        }}
      />
    </body>
  </html>
);

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
  getDataFromTree(App).then((content) => {
    const initialState = client.extract();
    const html = <Html content={content} state={initialState} />;
    res.send(`<!Doctype html>\n${ReactDomServer.renderToStaticMarkup(html)}`);
    res.end();
  });
});
app.use("/static", express.static(path.join(__dirname, "..", "public")));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
