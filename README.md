## Getting started
This is a starter template to use Puppeteer nodejs library on serverless AWS lambda using AWS Sam.

<br>What is Puppeteer: Puppeteer is a Node library which provides a high-level API to control Chrome. [Ref](https://github.com/GoogleChrome/puppeteer)
<br>What is Lambda: AWS Lambda lets you run code without provisioning or managing servers. [Ref](https://aws.amazon.com/lambda/)
<br>What is SAM: Open-source framework that you can use to build serverless applications on AWS. [Ref](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)

## Setting up
1. Download and install nodejs recommended version is 8.10 and up.
2. Download and install AWS SAM for code development https://aws.amazon.com/serverless/sam/
3. cd into ./nodejs and install dependencies with npm i
4. To run the program and execute each lambda function locally, from your root run the command;
```bash
sam local invoke LAMBDA_FUNCTION_NAME -e event.json --env-vars .env.json
```
Lambda functions are stated at template.yaml file

## Deployment

Firstly, we need a `S3 bucket` where we can upload our Lambda functions packaged as ZIP before we deploy anything - If you don't have a S3 bucket to store code artifacts then this is a good time to create one with command line or from the aws console:
```bash
aws s3 mb s3://BUCKET_NAME
```

Next, run the following command to package our Lambda function to S3:

```bash
sam package \
    --output-template-file packaged.yaml \
    --s3-bucket REPLACE_THIS_WITH_YOUR_S3_BUCKET_NAME
```

Next, the following command will create a Cloudformation Stack and deploy your SAM resources.

```bash
sam deploy \
    --template-file packaged.yaml \
    --stack-name sg-test \
    --capabilities CAPABILITY_IAM
```

## Project structure explanation
<br>`./dependencies/nodejs` is where you store your node modules and package.json file. While adding a new library cd inside and npm install.
<br>`template.yaml` is where we tell aws SAM what to look for while creating aws resources. It is a cloudformation template so you can create every kinds of resources. Contains the sample lambda functions and layers.
<br>`event.json` is the input for lambda function to use locally
<br>`src/functions` contains your lambda functions
<br>`src/utilities_layer` holds mutual functions may be used between your lambda functions. An additional layer is created from this folder



