const { handle } = require("../handler");
const USER_AGENTS = require("./user-agents.json");

Object.keys(USER_AGENTS).forEach(browser => {
  const userAgent = USER_AGENTS[browser];
  const event = { requestContext: { identity: { userAgent } } };

  test(`returns a reasonable response for ${browser}`, done => {
    handle(event, null, (error, response) => {
      const { statusCode, headers, body } = response;

      expect(error).toBe(null);
      expect(statusCode).toEqual(200);
      expect(headers["Content-Type"].startsWith("application/javascript")).toBe(true);

      expect(body).toMatchSnapshot();
      done();
    });
  });
});
