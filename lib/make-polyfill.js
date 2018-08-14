"use strict";

const { getPolyfillString } = require("polyfill-service");

const makePolyfill = ({ uaString, cache }) => getPolyfillString({
  uaString,
  minify: cache,
  features: {
    "default-3.6": {},
    es6: {},
    es7: {}
  },
  unknown: "polyfill"
}).then(polyfill => ({
  statusCode: 200,
  headers: {
    "access-control-allow-origin": [{
      key: "Access-Control-Allow-Origin",
      value: "*"
    }],
    "content-type": [{
      key: "Content-Type",
      value: "application/javascript;charset=utf-8"
    }],
    "content-length": [{
      key: "Content-Length",
      value: polyfill.length
    }],
    "cache-control": [{
      key: "Cache-Control",
      value: cache ? "max-age=31536000" : null
    }]
  },
  body: polyfill
}));

module.exports = makePolyfill;
