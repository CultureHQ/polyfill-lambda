const express = require("express");
const { getPolyfillString } = require("polyfill-service");

const app = express();

const makePolyfill = uaString => polyfill.getPolyfillString({
  uaString,
  minify,
  features: { es6: {}, "default-3.6": {} },
  unknown: "polyfill"
}).then(polyfill => ({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/javascript;charset=utf-8",
    "Content-Length": polyfill.length
  },
  body: polyfill
}));

app.options("/", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.end();
});

app.get("/", (request, response, next) => {
  console.log(`[${new Date().toUTCString()}] GET /`);

  makePolyfill(request.headers["user-agent"]).then(({ headers, body }) => {
    Object.keys(headers).forEach(header => {
      response.setHeader(header, headers[header]);
    });

    response.send(body);
  }).catch(next);
});

app.listen(8081, () => {
  console.log("Listening on port 8081...");
});
