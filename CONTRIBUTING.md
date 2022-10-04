# **Beginner Friendly for HacktoberFest**

We at KLARK mines information from product development tools deployed on the company intranet. It uses multiple information sources to analyze and present information.

**Following are the steps to contribute to Klark:**

# Installation Guide

## Setup
`git clone` the repo and `cd` into it by running the following command:
```bash
git clone https://github.com/jarvis-product-bot-2/alexa-skill-klark-bot
cd alexa-skill-klark-bot
```
### `npm install`

> **Note: You’ll need to have Node 8.10.0 or later on your local development machine.** You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.
`git clone` the repo and `cd` into it by running the following command:


**Use ASK CLI commands to manage your skill**

```bash
ask init #setup the developer account
ask deploy
```
> **For Testing** Visit (https://developer.amazon.com/alexa/console/ask):
Test using **Test section** under developer console.

### Repository Contents

*  `/.ask` - [ASK CLI (Command Line Interface) Configuration](https://developer.amazon.com/docs/smapi/ask-cli-intro.html)

*  `/lambda/custom` - Back-End Logic for the Alexa Skill hosted on [AWS Lambda](https://aws.amazon.com/lambda/)

*  `/lambda/custom/resources` - Language specific speech response

*  `/models` - Voice User Interface and Language-Specific Interaction Models

*  `skill.json` - [Skill Manifest](https://developer.amazon.com/docs/smapi/skill-manifest.html)

## A Little Help

### TASK #1
Try to integrate a new software development tool to Klark.
For now, we have successfully integrated - 
-  Github
-  Trello
-  Travis CI
-  Zoom

### TASK #2
Try to add new language locales to Klark Alexa Skill.
Currently, we only have support for English-US.

Keep an eye on our issues. We are just beginning and will surely appreciate all the help we can get. All ideas are welcome.
