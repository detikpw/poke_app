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
      <!--source: https://www.favicon.cc/?action=icon_list&user_id=261331-->
      <link href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGgAAAHwAAAC9AAAA2QAAANkAAADBAAAAhQAAACIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAYGBvNXV1f/q6uq/9TU1P/V1dX/paWl/0dHRv8HBwb3AAAAgQAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAkSQkJP/R0dD////////////////////////////19fX/oKCf/yIiIf8AAACpAAAAAgAAAAAAAAAAAAAAaCIiIv/n5+f//////////////////////////////////////+Xl5f+qqqr/IiIh/wAAAIEAAAAAAAAAEgMDA+/Jycn///////////////////////39/f/9/f3////////////+/v7/vLy8/5ubmv8GBgb3AAAAIgAAAG5KSkn/////////////////+/v7/3h4d/8WFhb/FBQU/2lpaP/29vb//////9rb2/+xsbH/RERD/wAAAIUAAACrl5eX/////////////////4GBgP8wMDD/ysrK/8/Pzv9AQED/aGhn///////s7O3/r6+v/4KCgf8AAADDAAAAz0lJSf9kZGT/ZGRk/2RkZP8RERD/wcHB/yoqKv8cHBv/0NDP/woKCv9kZGT/YGBg/0VFRP88PDv/AAAA2wAAAM0NCDn/DwhJ/xYKZP8ZCm//BAMT/7u7u/88PDz/Kioq/8vLy/8DAgv/GQpu/xgKbP8YCm3/FQld/wAAANkAAACnEQlR/xsMi/8lDbj/Kg3P/xkKdP8lJST/u7u7/8HBwP8wMDD/FQlh/yoN0P8qDc3/Kg3O/x8Mjv8AAAC9AAAAZAgFJP8cDI7/IQym/yoNzf8qDc7/GQp0/wcEH/8GAxz/Fwpp/yoNzf8qDcz/Kg3M/ysN0f8PB0f/AAAAfAAAAA4AAAHrFgtr/x0Mkf8qDcz/Kg3M/yoNzv8qDc//Kg7P/yoNzv8qDcz/Kg3M/yoNzP8lDa3/AQEE9QAAABoAAAAAAAAAWgMCDv8aDHz/Iw2w/yoNzf8qDcz/Kg3M/yoNzP8qDcz/Kg3M/yoNzP8oDsH/BwQd/wAAAHAAAAAAAAAAAAAAAAAAAAB8AwIP/xYLbP8mDb3/Kg3O/yoNzP8qDcz/Kg3M/ysN0f8jDab/BgMb/wAAAJEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFoAAADrCAUk/xYJaf8hDJ7/Igyj/xoKe/8OBzz/AQEC7wAAAGoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAGQAAACnAAAAzQAAAM8AAACrAAAAbAAAABQAAAAAAAAAAAAAAAAAAAAA/B8AAPAHAADAAwAAwAEAAIABAACAAAAAAAAAAAAAAAAAAAAAAAAAAIABAACAAQAAwAMAAOADAADwDwAA/D8AAA==" rel="icon" type="image/x-icon" />
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
