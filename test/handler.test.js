const { handle } = require("../handler");

const userAgents = {
  "Safari 9":   "Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1",
  "Chrome 63":  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
  "Firefox 56": "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0",
  "IE 9":       "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
  "IE 11":      "Mozilla/5.0 (Windows NT 6.1; Win64; x64; Trident/7.0; rv:11.0) like Gecko",
  "Edge 25":    "Mozilla/5.0 (Windows NT 5.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586"
};

const buildEvent = (detectedUserAgent, queryUserAgent) => {
  const ua = queryUserAgent === undefined ? "" : `?ua=${encodeURIComponent(queryUserAgent)}`;

  return {
    requestContext: { identity: { userAgent: detectedUserAgent } },
    queryStringParameters: { ua }
  };
};

const expectValidResponse = (event, done) => {
  handle(event, null, (error, response) => {
    expect(error).toBe(null);

    const { statusCode, headers, body } = response;

    expect(statusCode).toEqual(200);
    expect(headers["Content-Type"].startsWith("application/javascript")).toBe(true);
    expect(body).toMatchSnapshot();

    done();
  });
};

Object.keys(userAgents).forEach(browser => {
  test(`returns a reasonable response for ${browser}`, done => {
    const event = buildEvent(userAgents[browser], userAgents[browser]);
    expectValidResponse(event, done);
  });
});

test("does not require a ua query param", done => {
  const event = buildEvent(userAgents["Chrome 63"]);
  expectValidResponse(event, done);
});

test("allows overriding the user agent with the ua query param", done => {
  const event = buildEvent(userAgents["Chrome 63"], userAgents["IE 9"]);
  expectValidResponse(event, done);
});
