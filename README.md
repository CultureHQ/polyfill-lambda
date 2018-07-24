# polyfill-lambda

Uses [polyfill.io](https://polyfill.io/v2/docs/)'s service to generate a polyfill based on the user agent of the request. Aggressively caches to ensure as few requests as possible.

## Getting started

Ensure you have `node` and `yarn` installed. Run `yarn start` to start a local server at `http://localhost:8081`. Visit that location in different browsers to view the polyfill. Note that since this server is running in development, it returns unminified JavaScript.

## Deployment

Install [`serverless`](https://serverless.com/) by running `npm install -g serverless`. You can then run `sls deploy --aws-profile [PROFILE]` to deploy the function.

## Testing

Unit tests are run by executing `yarn test`.
