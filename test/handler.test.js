const { handle } = require("../handler");
const USER_AGENTS = require("./user-agents.json");

Object.keys(USER_AGENTS).forEach(browser => {
  test(`returns a reasonable response for ${browser}`, done => {
    handle({ headers: { "user-agent": USER_AGENTS[browser] } }, null, (error, response) => {
      const { statusCode, headers, body } = response;

      expect(error).toBe(null);
      expect(statusCode).toEqual(200);
      expect(headers["Content-Type"].startsWith("application/javascript")).toBe(true);

      expect(body).toMatchSnapshot();
      done();
    });
  });
});
