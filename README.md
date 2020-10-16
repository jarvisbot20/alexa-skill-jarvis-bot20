# alexa-skill-klark-bot
Intelligent Process Manager (IPM): It serves information from the tools deployed from the corporate intranet. It uses multiple information sources in order to learn about a product to optimize developer/product support processes in a team from task allotment to project deployment.

# Installation Guide

## Setup
`git clone` the repo and `cd` into it by running the following command:
```bash
git clone https://github.com/klark-product-bot/alexa-skill-klark-bot
cd alexa-skill-klark-bot
```
### `npm install`

> **Note: You’ll need to have Node 8.10.0 or later on your local development machine.** You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.
`git clone` the repo and `cd` into it by running the following command:


**Use ASK CLI commands to manage your skill**   
**1. Install CLI**

```
$ npm install -g ask-cli
```


**2. Configure CLI profile**

Before you can start using the ASK CLI, configure your ASK (and AWS) credentials:

```
$ ask configure
```

You’ll be prompted to sign into your Amazon developer account. If you choose to have your skill hosted by AWS, you’ll have the option of linking your AWS account as well.

<p align="center">
  <img align="center" src="https://ask-cli-static-content.s3-us-west-2.amazonaws.com/document-assets/v2-ask-cli-configure.gif" height="520" />
</p>


**3. ASK init**

Initialize a skill project and follow the prompts from the command:

```
$ ask init
```

**4. Deploy Alexa skill**

In order for Alexa to communicate with your skill code, it will need to be deployed and hosted on the cloud using this command.

```
$ ask deploy
```

The deploy command performs the following steps:

1. `skill-package/` resources will be zipped and uploaded to the ASK platform via SMAPI's [Skill Package Service](https://developer.amazon.com/docs/smapi/skill-package-api-reference.html).
2. `lambda/` source files will be built and zipped for deployment to AWS. We currently support the build flows of npm for Nodejs, pip for Python and maven for Java developers.
3. `infrastructure/` definitions will be used to provision resources on AWS. The `lambda/`'s zip file from the previous step will be deployed to the provisioned AWS Lambda function. The gif below shows the deployment using `@ask-cli/cfn-deployer`, you can also try other deployers as they serve different purposes.

<p align="center">
  <img align="center" src="https://ask-cli-static-content.s3-us-west-2.amazonaws.com/document-assets/v2-ask-cli-deploy.gif" height="520" />
</p>


> **For Testing** Visit (https://developer.amazon.com/alexa/console/ask):   
Test using **Test section** under developer console.
