const path = require("path");
const express = require("express");
const app = require("./public/App");

const server = express();

server.use(express.static(path.join(__dirname, "public")));

server.get("*", function (req, res) {
  const { html } = app.render({ url: req.url });

  res.write(`
    <!DOCTYPE html>
    <link rel='stylesheet' href='/build/bundle.css'>
    <body>${html}</body>
    <script src="/build/bundle.js"></script>
  `);
  res.end();
});

const port = 3000;
server.listen(port, () => console.log(`Listening on port ${port}`));
