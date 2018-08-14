# polyfill-lambda

[![Build Status](https://travis-ci.com/CultureHQ/polyfill-lambda.svg?branch=master)](https://travis-ci.com/CultureHQ/polyfill-lambda)

Uses [polyfill.io](https://polyfill.io/v2/docs/)'s service to generate a polyfill based on the user agent of the request. Aggressively caches to ensure as few requests as possible.

## Getting started

Ensure you have `node` and `yarn` installed. Run `yarn start` to start a local server at `http://localhost:8080`. Visit that location in different browsers to view the polyfill. Note that since this server is running in development, it returns unminified JavaScript.

## Deployment

Install [`serverless`](https://serverless.com/) by running `npm install -g serverless`. You can then run `sls deploy --aws-profile [PROFILE]` to deploy the function. This will trigger output that looks something like:

```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service .zip file to S3 (57.17 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
..............
Serverless: Stack update finished...
Service Information
service: polyfill
stage: production
region: us-west-2
stack: polyfill-production
api keys:
  None
endpoints:
  GET - https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/production/polyfill
functions:
  polyfill: polyfill-production-polyfill
```

You can then place that URL in a `script` tag in your application's HTML before you load your main JavaScript to get all of the necessary polyfills.

## Testing

Unit tests are run by executing `yarn test`.
