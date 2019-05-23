"use strict";

const express = require("express");
const { makePolyfill } = require("./handler");

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toUTCString()}] ${req.method} ${req.path}`);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");

  next();
});

app.get("/", (request, response, next) => {
  const uaString = request.headers["user-agent"];

  makePolyfill({ uaString, cache: false }).then(({ headers, body }) => {
    Object.keys(headers).forEach(header => {
      response.setHeader(header, headers[header][0].value);
    });

    response.send(body);
  }).catch(next);
});

app.listen(8080, () => console.log("Listening on port 8080..."));
