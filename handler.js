"use strict";

const { getPolyfillString } = require("polyfill-service");

const makePolyfill = ({ uaString, cache }) => (
  getPolyfillString({
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
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/javascript;charset=utf-8",
      "Content-Length": polyfill.length,
      "Cache-Control": cache ? "max-age=31536000" : null
    },
    body: polyfill
  }))
);

const handle = (event, context, callback) => {
  const { requestContext, queryStringParameters: query } = event;
  const uaString = (query && query.ua) || requestContext.identity.userAgent;

  makePolyfill({ uaString, cache: true })
    .then(response => callback(null, response))
    .catch(callback)
};

module.exports = { makePolyfill, handle };
