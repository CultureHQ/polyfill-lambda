# polyfill-lambda

[![Build Status](https://travis-ci.com/CultureHQ/polyfill-lambda.svg?branch=master)](https://travis-ci.com/CultureHQ/polyfill-lambda)

`polyfill-lambda` is a service deployed to Amazon Web Services that returns JavaScript polyfills based on the user agent of the requesting browser. You can use this package to deploy your own version for your service or organization.

## Getting started

Ensure you have `node` and `yarn` installed.

1. Run `yarn` in the root of the repository to get the dependencies.
2. Create a `src/features.js` file (you can copy the sample) containing the features that you want polyfilled. You can take a look at [polyfill.io's docs](https://polyfill.io/v3/url-builder/) for the available options.
3. Create a `src/headers.js` file (you can copy the sample) containing the desired headers to be served alongside the JavaScript.

Now you can run `yarn start` to start a local server at `http://localhost:8080`. Visit that location in different browsers to view the polyfill. Note that since this server is running in development, it returns unminified JavaScript.

## Deployment

First, copy `serverless-env.yml.sample` to `serverless-env.yml` and fill in the relevant information. Below are the explanation for the options:

- `bucket.name` - any name unique to S3. Nothing actually gets stored in here, it's just used as the origin for CloudFront
- `distribution.alias` - the domain that will be used for the CloudFront distribution (presumably something like `polyfill.culturehq.com`)
- `distribution.cert-arn` - the ARN of an AWS Certificate Manager certificate that matches the alias (as in, as certificate for `polyfill.culturehq.com`)

With the config in place, install [`serverless`](https://serverless.com/) by running `npm install -g serverless`. You can then run `sls deploy --aws-profile [PROFILE]` to deploy the lambda function, S3 bucket, and CloudFront distribution.

Once everything has been deployed, you can associate the CloudFront distribution with your domain through AWS Route53 by creating an alias record for the appropriate hosted zone. Then you can include script tag like the below to conditionally load only the correct polyfills:

```html
<script type="text/javascript" src="https://polyfill.culturehq.com"></script>
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/CultureHQ/polyfill-lambda.

## License

The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
