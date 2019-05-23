"use strict";

const { getPolyfillString } = require("polyfill-library");

const features = {
  "default-3.6": {},
  es6: {},
  es7: {}
};

const makePolyfill = ({ uaString, cache }) => (
  getPolyfillString({ uaString, minify: cache, features, unknown: "polyfill" })
    .then(polyfill => ({
      status: 200,
      statusDescription: "OK",
      headers: {
        "Access-Control-Allow-Origin": [{
          key: "Access-Control-Allow-Origin",
          value: "*"
        }],
        "Cache-Control": [{
          key: "Cache-Control",
          value: cache ? "max-age=31536000" : "no-cache"
        }],
        "Content-Type": [{
          key: "Content-Type",
          value: "application/javascript;charset=utf-8"
        }]
      },
      body: polyfill
    }))
);

const handle = (event, context, callback) => {
  const uaString = event.Records[0].cf.request.headers["user-agent"][0].value;

  makePolyfill({ uaString, cache: true })
    .then(response => callback(null, response))
    .catch(callback)
};

module.exports = { makePolyfill, handle };
