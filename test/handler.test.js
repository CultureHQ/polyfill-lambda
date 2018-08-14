const { handle } = require("../handler");
const USER_AGENTS = require("./user-agents.json");

const buildEvent = (detectedUserAgent, queryUserAgent) => {
  const querystring = queryUserAgent === undefined ? "" : `?ua=${encodeURIComponent(queryUserAgent)}`;

  return {
    requestContext: { identity: { userAgent: detectedUserAgent } },
    Records: [{ cf: { request: { querystring } } }]
  };
};

const expectValidResponse = (event, done) => {
  handle(event, null, (error, response) => {
    expect(error).toBe(null);

    const { statusCode, headers: { "content-type": [{ value: contentType }] }, body } = response;

    expect(statusCode).toEqual(200);
    expect(contentType.startsWith("application/javascript")).toBe(true);
    expect(body).toMatchSnapshot();

    done();
  });
};

Object.keys(USER_AGENTS).forEach(browser => {
  test(`returns a reasonable response for ${browser}`, done => {
    const event = buildEvent(USER_AGENTS[browser], USER_AGENTS[browser]);
    expectValidResponse(event, done);
  });
});

test("does not require a ua query param", done => {
  const event = buildEvent(USER_AGENTS["Chrome 63"]);
  expectValidResponse(event, done);
});

test("allows overriding the user agent with the ua query param", done => {
  const event = buildEvent(USER_AGENTS["Chrome 63"], USER_AGENTS["IE 9"]);
  expectValidResponse(event, done);
});
