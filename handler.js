"use strict";

const { getPolyfillString } = require("polyfill-service");

const makePolyfill = uaString => getPolyfillString({
  uaString,
  minify: true,
  features: { "default-3.6": {}, es6: {}, es7: {} },
  unknown: "polyfill"
}).then(polyfill => ({
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/javascript;charset=utf-8",
    "Content-Length": polyfill.length,
    "Cache-Control": "max-age=31536000"
  },
  body: polyfill
}));

const handle = (event, context, callback) => (
  makePolyfill(event.requestContext.identity.userAgent)
    .then(response => callback(null, response))
    .catch(callback)
);

module.exports = { handle };
