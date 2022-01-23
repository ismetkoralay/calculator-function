# calculator-function
Lambda function that calculates the result of a mathematical expression provided as string.

## Install Nodejs

https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04

## Install Serverless Framework

```bash
npm install serverless -g
```

## Provide AWS credentials for serverless

- First create a user in your AWS account named serverless-admin(or anything else) which should have programmatic access and admin role and keep your access key and secret key.

```bash
serverless config credentials --provider aws --key xxx -- secret yyy --profile serverless-admin
```

## Deploy the function

- The command below will deploy your function and provide you an api gateway endpoint in the output. You can use it to test the function. You should provide query querystring to test it. The value of the query should be encoded with base64.

```bash
serverless deploy --verbose
```