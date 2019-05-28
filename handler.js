"use strict";

const { getPolyfillString } = require("polyfill-library");

const features = require("./src/features");
const headers = require("./src/headers");

const makePolyfill = ({ uaString, cache }) => (
  getPolyfillString({ uaString, minify: cache, features, unknown: "polyfill" })
    .then(polyfill => {
      const polyfillHeaders = {
        ...headers,
        "Cache-Control": cache ? "max-age=31536000" : "no-cache",
        "Content-Type": "application/javascript;charset=utf-8"
      };

      return {
        status: 200,
        statusDescription: "OK",
        headers: Object.keys(polyfillHeaders).reduce(
          (accum, key) => ({ ...accum, [key]: [{ key, value: polyfillHeaders[key] }] }), {}
        ),
        body: polyfill
      };
    })
);

const handle = (event, context, callback) => {
  const uaString = event.Records[0].cf.request.headers["user-agent"][0].value;

  makePolyfill({ uaString, cache: true })
    .then(response => callback(null, response))
    .catch(callback)
};

module.exports = { makePolyfill, handle };
