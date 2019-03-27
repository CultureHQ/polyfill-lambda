"use strict";

const express = require("express");
const { makePolyfill } = require("./handler");

const app = express();

app.options("/", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.end();
});

app.get("/", (request, response, next) => {
  console.log(`[${new Date().toUTCString()}] GET /`);

  const uaString = request.query.ua || request.headers["user-agent"];

  makePolyfill({ uaString, cache: false }).then(({ headers, body }) => {
    Object.keys(headers).forEach(header => {
      response.setHeader(header, headers[header]);
    });

    response.send(body);
  }).catch(next);
});

app.listen(8080, () => {
  console.log("Listening on port 8080...");
});
