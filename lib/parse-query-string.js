"use strict";

const parseQueryString = string => {
  if (string.length === 0) {
    return {};
  }

  const components = string.slice(1).split("&");
  const accum = {};

  for (let idx = 0; idx < components.length; idx += 1) {
    const [key, value] = components[idx].split("=");
    accum[key] = decodeURIComponent(value);
  }

  return accum;
};

module.exports = parseQueryString;
