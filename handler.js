"use strict";

const makePolyfill = require("./lib/make-polyfill");
const parseQueryString = require("./lib/parse-query-string");

const getUserAgent = ({ requestContext, Records: [{ cf: { request } }] }) => {
  const { ua } = parseQueryString(request.querystring);
  return ua || requestContext.identity.userAgent;
};

const handle = (event, context, callback) => {
  makePolyfill({ uaString: getUserAgent(event), cache: true })
    .then(response => callback(null, response))
    .catch(callback)
};

module.exports = { handle };
