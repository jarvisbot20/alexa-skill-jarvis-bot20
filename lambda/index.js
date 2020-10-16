const Alexa = require('ask-sdk-core');
var request = require("request");
var env = require('dotenv').config();

var loginOptions = { method: 'POST',
  url: 'https://codefundo2019.tk/login',
  headers: {
    'postman-token': '8d8369f1-683c-58a5-51ac-0709fa826597',
    'cache-control': 'no-cache',
    'content-type': 'application/json' 
  },
  body: { 
    email: 'priyesh.sriv2017@gmail.com',
    password: 'Q123WERTY'
  },
  json: true 
};

var integrationsOptions = { method: 'GET',
  url: 'https://codefundo2019.tk/integrations',
  headers: { 
    'postman-token': '71f48851-d2eb-2156-c210-96baff7ebebd',
    'cache-control': 'no-cache',
    'token': ``
  } 
};

var createTaskOptions = { method: 'POST',
  url: 'https://api.trello.com/1/cards',
  qs: { key: 'a12ac0b756d26258be815a399da71296',
    token: 'ba013bc39ffd37dde296e20235757e73fb79af5409688ff4193890382aa66fd4',
    idList: '',
    name: ''
  },
  headers: { 'cache-control': 'no-cache',
    Connection: 'keep-alive',
    'Content-Length': '0',
    Host: 'api.trello.com',
    'Postman-Token': '225aa60b-ce35-4341-b5ab-703244c7c441,e4aa5e5a-36ea-4610-8b7d-c19aaac0ff88',
    'Cache-Control': 'no-cache',
  } 
};

var githubOptions = { method: 'GET',
  url: 'https://codefundo2019.tk/github',
  headers: { 'postman-token': '4e0b5a78-d39e-b56b-e089-7b8bca37f654',
    'cache-control': 'no-cache',
    token: ''
  } 
};

var jarvisBotOptions = { method: 'GET',
  url: 'https://codefundo2019.tk/installation',
  headers: 
  { 'postman-token': 'f11b9078-e89a-4500-b26e-ad719d8ffec5',
     'cache-control': 'no-cache',
     reqddocker: 'false',
     os: 'ubuntu',
     projectname: '',
     token: ''
  } 
};

var projectStatusOptions = { method: 'GET',
  url: 'https://codefundo2019.tk/status/project',
  headers: 
   { 'postman-token': 'fa69cc80-209c-6703-0bd0-1960daa9f4fc',
     'cache-control': 'no-cache',
     projectname: 'jarvis-apis',
     token: ''
   } 
};

var buildResultOptions = { method: 'GET',
  url: 'https://codefundo2019.tk/buildresult',
  headers: 
   { 'postman-token': '02745993-5002-d612-2661-41ec83936dda',
     'cache-control': 'no-cache',
     projectname: 'dummytestcases',
     token: '' 
   } 
};

var featureOptions = { method: 'GET',
  url: 'https://codefundo2019.tk/summary/featuredev',
  headers: 
   { 'postman-token': '45e8fe8a-7b8e-654f-0228-12a07027088f',
     'cache-control': 'no-cache',
     issuename: 'Zoom Video Analysis',
     projectname: 'jarvis-apis',
     token: '' 
   } 
};

var listOptions = { method: 'GET',
  url: 'http://3.95.154.161/meetings/list',
  qs: { pageno: '1', userid: 'thom.grace@traho.io' },
  headers: 
   { 'Postman-Token': '05dfa266-4136-479f-98eb-a8037d9c12cc',
     'cache-control': 'no-cache',
     Authorization: ''
   }
};

var endOptions = { 
  method: 'PUT',
  url: 'http://3.95.154.161/meetings/start',
  qs: { action: 'end' },
  headers: { 
     Authorization: '',
     'Content-Type': 'application/json'
  },
  body: '',
  json: true 
};

var startOptions = { 
  method: 'PUT',
  url: 'http://3.95.154.161/meetings/start',
  qs: { action: 'start' },
  headers: { 
     Authorization: '',
     'Content-Type': 'application/json'
  },
  body: '',
  json: true 
};

var createOptions = { method: 'POST',
  url: 'http://3.95.154.161/meetings/create',
  qs: { userid: 'thom.grace@traho.io' },
  headers: 
   { 'Postman-Token': 'b1fc8247-cf9c-427e-8105-54697bca371e',
     'cache-control': 'no-cache',
     'Content-Type': 'application/json' },
  body: 
   { meeting_type: 2,
     duration: 10,
     start_time: '2020-05-13T13:00:00Z',
     topic: 'Special Test Meetings',
     recurrence_type: 1,
     repeat_interval: 5,
     invitees: 
      [ 'First_name Last_name',
        'First_name Last_name',
        'First_name Last_name',
        'First_name Last_name' ] },
  json: true };

async function auth(options) {
  return new Promise((resolve) => {
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
      setTimeout(() => resolve(response.body), 1000);
    });
  });
}

const LaunchRequest = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    
    var speechOutput = `Hello, Jarvis here. Your Intelligent process manager. `;
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    await auth(loginOptions).then((response) => {
      SessionAttributes.LoginStatus = response;
    });
    
    if(SessionAttributes.LoginStatus.statusCode === 200){
      speechOutput += `You are now successfully Logged In. How can I help you today? `;
    }else{
      speechOutput += `There was some error while logging into the system. Please try Logging again in the system. Thank You. `;
    }

    handlerInput.attributesManager.setSessionAttributes(SessionAttributes);
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  }
};

const CreateMeeting = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'createMeeting';
  },
  async handle(handlerInput) {
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput = '';

    if(!SessionAttributes.LoginStatus){
      await auth(loginOptions).then((response) => {
        response = JSON.parse(response);
        SessionAttributes.LoginStatus = response;
      });
    }
    if(!SessionAttributes.MeetingList){
      listOptions.headers.Authorization = SessionAttributes.LoginStatus.token;
      await auth(listOptions).then((response) => {
        response = JSON.parse(response);
        SessionAttributes.MeetingList = response;
      });
    }

    
    
    SessionAttributes.Last = speechOutput;
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  },
};

const StartMeeting = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'startMeeting';
  },
  async handle(handlerInput) {
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput = '';

    if(!SessionAttributes.LoginStatus){
      await auth(loginOptions).then((response) => {
        response = JSON.parse(response);
        SessionAttributes.LoginStatus = response;
      });
    }
    if(!SessionAttributes.MeetingList){
      listOptions.headers.Authorization = SessionAttributes.LoginStatus.token;
      await auth(listOptions).then((response) => {
        response = JSON.parse(response);
        SessionAttributes.MeetingList = response;
      });
    }

    var len = SessionAttributes.MeetingList.meetings.length;
    console.log(SessionAttributes.MeetingList.meetings.length);
    if(len === 0){
      speechOutput = `You don't have any meetings for today on your calender. What else can I help you with? `;
    }
    else{
      startOptions.headers.Authorization = SessionAttributes.LoginStatus.token;
      startOptions.body = SessionAttributes.MeetingList.meetings[0];
      speechOutput = `${SessionAttributes.UserData.name}, your next meeting is on ${SessionAttributes.MeetingList.meetings[0].topic}. Would you like to start? `;
      SessionAttributes.WaitStart = true;
      SessionAttributes.StartOptions = startOptions;
    }
    
    SessionAttributes.Last = speechOutput;
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  },
};

const EndMeeting = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'endMeeting';
  },
  async handle(handlerInput) {
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput = '';

    if(!SessionAttributes.LoginStatus){
      await auth(loginOptions).then((response) => {
        response = JSON.parse(response);
        SessionAttributes.LoginStatus = response;
      });
    }
    if(!SessionAttributes.MeetingList){
      listOptions.headers.Authorization = SessionAttributes.LoginStatus.token;
      await auth(listOptions).then((response) => {
        response = JSON.parse(response);
        SessionAttributes.MeetingList = response;
      });
    }

    var len = SessionAttributes.MeetingList.meetings.length;
    console.log(SessionAttributes.MeetingList.meetings.length);
    if(len === 0){
      speechOutput = `You don't have any meetings for today on your calender. What else can I help you with? `;
    }
    else{
      endOptions.headers.Authorization = SessionAttributes.LoginStatus.token;
      endOptions.body = SessionAttributes.MeetingList.meetings[0];
      speechOutput = `${SessionAttributes.UserData.name}, you want to end your meeting on ${SessionAttributes.MeetingList.meetings[0].topic}? `;
      SessionAttributes.WaitEnd = true;
      SessionAttributes.EndOptions = endOptions;
    }
    
    SessionAttributes.Last = speechOutput;
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  },
};

const ListMeeting = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'listMeeting';
  },
  async handle(handlerInput) {
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    
    if(!SessionAttributes.LoginStatus){
      await auth(loginOptions).then((response) => {
        response = JSON.parse(response);
        SessionAttributes.LoginStatus = response;
      });
    }
    
    listOptions.headers.Authorization = SessionAttributes.LoginStatus.token;
    
    await auth(listOptions).then((response) => {
      response = JSON.parse(response);
      SessionAttributes.MeetingList = response;
    });

    var speechOutput;
    var len = SessionAttributes.MeetingList.meetings.length;
    console.log(SessionAttributes.MeetingList.meetings.length);
    if(len === 0){
      speechOutput = `You don't have any meetings for today on your calender.`;
    }
    else{
      speechOutput = `So here's the detail of your meetings in next 24 hours: ` ;
      
      for(var i=0; i<len; i++){
        var meetingDate = new Date(SessionAttributes.MeetingList.meetings[i].start_time).toLocaleString("en-US", {timeZone: "America/New_York"});
        meetingDate = meetingDate.toString().replace(' GMT-0400 (Coordinated Universal Time)', '');
        var topic = SessionAttributes.MeetingList.meetings[i].topic;
        speechOutput += `<break time="1s"/>${topic} scheduled on ${meetingDate}. `;
      }
    }
    
    SessionAttributes.Last = speechOutput;
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .getResponse();
  },
};

const FeatureImplementation = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'implementationDetails');
  },
  async handle(handlerInput) {
    var projectName;
    var issueName;
    var speechOutput;
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    if(handlerInput.requestEnvelope
      && handlerInput.requestEnvelope.request
      && handlerInput.requestEnvelope.request.intent
      && handlerInput.requestEnvelope.request.intent.slots
      && handlerInput.requestEnvelope.request.intent.slots.project
      && handlerInput.requestEnvelope.request.intent.slots.project.resolutions
      && handlerInput.requestEnvelope.request.intent.slots.project.resolutions.resolutionsPerAuthority[0]){
      projectName = handlerInput.requestEnvelope.request.intent.slots.project.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    } else{
      speechOutput = `Sorry, but we don't have any status for this project. What can I help you with? `;
      
      return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
    }
    if(handlerInput.requestEnvelope
      && handlerInput.requestEnvelope.request
      && handlerInput.requestEnvelope.request.intent
      && handlerInput.requestEnvelope.request.intent.slots
      && handlerInput.requestEnvelope.request.intent.slots.issue
      && handlerInput.requestEnvelope.request.intent.slots.issue.resolutions
      && handlerInput.requestEnvelope.request.intent.slots.issue.resolutions.resolutionsPerAuthority[0]){
      issueName = handlerInput.requestEnvelope.request.intent.slots.issue.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    } else{
      speechOutput = `Sorry, we don't have project implementation for that issue. What can I help you with? `;
      
      return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
    }
    featureOptions.headers.projectname = projectName;
    featureOptions.headers.issuename = issueName;
    featureOptions.headers.token = SessionAttributes.LoginStatus.auth_token;

    await auth(featureOptions).then((response) => {
      var featureStatus = JSON.parse(response);
      SessionAttributes.FeatureStatus = featureStatus;
      speechOutput = `${featureStatus.metadata_string} Would you like to know the change history as well? `;
      SessionAttributes.ChangeHistory = true;
    });

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const YesIntentHandler = {
  canHandle(handlerInput) {
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
      && SessionAttributes.ChangeHistory === true);
  },
  async handle(handlerInput){
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput = `${SessionAttributes.FeatureStatus.change_history} What else can I help you with?`;

    if(SessionAttributes.WaitEnd === true){
      await auth(endOptions).then((response) => {
        console.log(response);
      });
      SessionAttributes.WaitEnd = false;
      speechOutput = `Meeting ended. `;
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(speechOutput)
        .withShouldEndSession(true)
        .getResponse();
    }
    
    if(SessionAttributes.WaitStart === true){
      await auth(startOptions).then((response) => {
        console.log(response);
      });
      SessionAttributes.WaitStart = false;
      speechOutput = `Meeting started. `;
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(speechOutput)
        .withShouldEndSession(true)
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  }
};

const BuildStatus = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'buildStatus');
  },
  async handle(handlerInput) {
    var projectName;
    var speechOutput;
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    if(handlerInput.requestEnvelope
      && handlerInput.requestEnvelope.request
      && handlerInput.requestEnvelope.request.intent
      && handlerInput.requestEnvelope.request.intent.slots
      && handlerInput.requestEnvelope.request.intent.slots.project
      && handlerInput.requestEnvelope.request.intent.slots.project.resolutions
      && handlerInput.requestEnvelope.request.intent.slots.project.resolutions.resolutionsPerAuthority[0]){
      projectName = handlerInput.requestEnvelope.request.intent.slots.project.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    } else{
      speechOutput = `Sorry, but we don't have any status for this project. What can I help you with? `;
      
      return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
    }
    buildResultOptions.headers.projectname = projectName;
    buildResultOptions.headers.token = SessionAttributes.LoginStatus.auth_token;

    await auth(buildResultOptions).then((response) => {
      var buildStatus = JSON.parse(response);
    
      speechOutput = `${buildStatus.message} What else can I help you with? `;
    });

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const ProjectStatus = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'projectStatus');
  },
  async handle(handlerInput) {
    var projectName;
    var speechOutput;
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    if(handlerInput.requestEnvelope
      && handlerInput.requestEnvelope.request
      && handlerInput.requestEnvelope.request.intent
      && handlerInput.requestEnvelope.request.intent.slots
      && handlerInput.requestEnvelope.request.intent.slots.software
      && handlerInput.requestEnvelope.request.intent.slots.software.resolutions
      && handlerInput.requestEnvelope.request.intent.slots.software.resolutions.resolutionsPerAuthority[0]){
      projectName = handlerInput.requestEnvelope.request.intent.slots.software.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    } else{
      speechOutput = `Sorry, but we don't have any status for this project. What can I help you with? `;
      
      return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
    }
    projectStatusOptions.headers.projectname = projectName;
    projectStatusOptions.headers.token = SessionAttributes.LoginStatus.auth_token;

    await auth(projectStatusOptions).then((response) => {
      var projectStatus = JSON.parse(response);
      //SessionAttributes.ProjectStatus = projectStatus;
      var progress = projectStatus.milestone.closed_issues/(projectStatus.milestone.closed_issues+projectStatus.milestone.open_issues);
      var createdDate = new Date(projectStatus.milestone.created_at);
      createdDate = createdDate.toString().replace(' GMT+0000', '');
      var dueDate = new Date(projectStatus.milestone.due_on);
      dueDate = dueDate.toString().replace(' GMT+0000', '');
      var urgentIssues = '';
      for(var i = 0; i<projectStatus.milestone.urgent_issues.length; i++){
        urgentIssues += `${i+1}. ${projectStatus.milestone.urgent_issues[i].title}. `;
      }

      speechOutput = `The earliest milestone is ${projectStatus.milestone.title}, which was created on ${createdDate.toString()}, and has
       to be completed by ${dueDate}. Current progress on the release is ${progress}, and the urgent issues pending for this 
      release are: ${urgentIssues}. What else can I help you with? `;
    });

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const GithubInstallation = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'gitGuide');
  },
  async handle(handlerInput) {

    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;
    var speechOutput;
    var softwareName = request.intent.slots.software.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    jarvisBotOptions.headers.projectname = softwareName;
    SessionAttributes.SoftwareName = softwareName;
    var OS;
    SessionAttributes.githubOptions = githubOptions;
    githubOptions.headers.token = SessionAttributes.LoginStatus.auth_token;

    await auth(githubOptions).then((response) => {
      var res = JSON.parse(response);
      var softwareNames = [];
      for(var i = 0; i<res['data'].length; i++){
        softwareNames.push(res.data[i].name);
      }
      SessionAttributes.SoftwareNames = softwareNames;
    });

    var dockerStatus = false;
    var status = request.intent.slots.dockerStatus.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    
    if(status === `locally`){
      OS = request.intent.slots.OS.resolutions.resolutionsPerAuthority[0].values[0].value.name;
      jarvisBotOptions.headers.os = OS;
    }
    else{
      jarvisBotOptions.headers.reqddocker = true;
      dockerStatus = true;
    }

    jarvisBotOptions.headers.token = SessionAttributes.LoginStatus.auth_token;
    await auth(jarvisBotOptions).then((response) => {
      SessionAttributes.JarvisStatus = JSON.parse(response);
    });

    if(dockerStatus){
      speechOutput = SessionAttributes.JarvisStatus.message;
    } else{
      speechOutput = `Instructions to install on ${OS}: `;
      if(OS==='ubuntu' || OS==='redhat' || OS==='macos'){
        speechOutput+= `Open the terminal and follow these commands. Firstly we will do.. `;
      }
      else{
        speechOutput+=`Open the command prompt and follow these steps. Firstly we will do.. `;
      }
      for(var i=0; i<SessionAttributes.JarvisStatus.instructions.length; i++){
        if(i===SessionAttributes.JarvisStatus.instructions.length-1){
          speechOutput += `finally do ${SessionAttributes.JarvisStatus.instructions[i]}.`;
        }
        else{
          speechOutput += `${SessionAttributes.JarvisStatus.instructions[i]}. Then `;
        }
      }
    }
    speechOutput += ` Your Product Installation Guide is completed. What else can I help you with? `;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const TrelloBoards = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'trelloBoards');
  },
  async handle(handlerInput) {

    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    integrationsOptions.headers.token = SessionAttributes.LoginStatus.auth_token;
    await auth(integrationsOptions).then((response) => {
      SessionAttributes.IntegrationsStatus = JSON.parse(response);
    });

    var speechOutput = 'Welcome to Trello Boards. ';

    const API_KEY = SessionAttributes.IntegrationsStatus.data.trello_creds.trelloAPIkey;
    const API_TOKEN = SessionAttributes.IntegrationsStatus.data.trello_creds.trelloAPISecret;
    const BOARD_ID = SessionAttributes.IntegrationsStatus.data.trello_creds.board; 

    var listsURL = `https://api.trello.com/1/boards/${BOARD_ID}/lists?key=${API_KEY}&token=${API_TOKEN}`;
    var boardURL = `https://api.trello.com/1/boards/${BOARD_ID}?key=${API_KEY}&token=${API_TOKEN}`;

    await getRemoteData(boardURL)
    .then((response) => {
      const data = JSON.parse(response);
      if(data.length === 0){
        speechOutput += `I can see, You don't have any trello boards created. Please visit trello.com and create trello boards.`;
        return handlerInput.responseBuilder
        .speak(speechOutput)
        .reprompt(speechOutput)
        .withShouldEndSession(true)
        .getResponse();
      }
      else{
        SessionAttributes.BoardName = data.name;
      }
    })
    .catch((err) => {
      //set an optional error message here
      speechOutput = err.message;
    });

    await getRemoteData(listsURL)
      .then((response) => {
        const data = JSON.parse(response);
        if(data.length === 0){
          speechOutput += `I can see you don't have any task created yet. Please visit trello.com and create tasks.`;
          return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(speechOutput)
          .withShouldEndSession(true)
          .getResponse();
        }
        else{
          speechOutput += `You have the following lists in your ${SessionAttributes.BoardName}. `;
          var listIdPair = {};
          for(var i=0; i<data.length; i++){
            speechOutput+=`List ${i+1}: ${data[i].name}. `;
            listIdPair[data[i].name] = (data[i].id);
            //console.log(listIdPair[data[i].name]);
          }
          SessionAttributes.ListIdPair = listIdPair;
          speechOutput += `Which one would you like to know? `;
        }
      })
      .catch((err) => {
        //set an optional error message here
        speechOutput = err.message;
      });

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();

  },
};

const TrelloLists = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'trelloList');
  },
  async handle(handlerInput) {

    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput;
    var listName;
    
    if(handlerInput.requestEnvelope
      && handlerInput.requestEnvelope.request
      && handlerInput.requestEnvelope.request.intent
      && handlerInput.requestEnvelope.request.intent.slots
      && handlerInput.requestEnvelope.request.intent.slots.listName
      && handlerInput.requestEnvelope.request.intent.slots.listName.resolutions
      && handlerInput.requestEnvelope.request.intent.slots.listName.resolutions.resolutionsPerAuthority[0]){
      listName = handlerInput.requestEnvelope.request.intent.slots.listName.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    }
    SessionAttributes.ListName = listName;
    const API_KEY = SessionAttributes.IntegrationsStatus.data.trello_creds.trelloAPIkey;
    const API_TOKEN = SessionAttributes.IntegrationsStatus.data.trello_creds.trelloAPISecret;
    const LIST_ID = SessionAttributes.ListIdPair[listName];

    var cardsURL = `https://api.trello.com/1/lists/${LIST_ID}/cards?key=${API_KEY}&token=${API_TOKEN}`;
    console.log(cardsURL);

    await getRemoteData(cardsURL)
      .then((response) => {
        const data = JSON.parse(response);
        if(data.length === 0){
          speechOutput += `I can see you don't have any task created yet. Please visit trello.com and create tasks. What else can I help you with? `;
          return handlerInput.responseBuilder
          .speak(speechOutput)
          .reprompt(speechOutput)
          .withShouldEndSession(false)
          .getResponse();
        }
        else{
          speechOutput = `You have the following tasks in your ${listName}. `;
          for(var i=0; i<data.length; i++){
            speechOutput +=`Task ${i+1}: ${data[i].name}. `;
            if(data[i].desc.length >= 1){
              speechOutput += `With Description: ${data[i].desc} `;
            }
            if(data[i].due){
              var date = new Date(data[i].due);
              date = date.toString();
              date = date.replace(' GMT+0000', '');
              speechOutput += `With Due date: ${date}. What else can I help you with? `;
            }
          }
        }
      })
      .catch((err) => {
        //set an optional error message here
        speechOutput = err.message;
      });

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const CreateTrelloTasks = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'createTask');
  },
  async handle(handlerInput) {

    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;
    var speechOutput = `Problem occured while creating task. Check logs for more detail. `;

    var date = new Date(`${request.intent.slots.dueDate.value}T${request.intent.slots.dueTime.value}`);
    createTaskOptions.qs.name = request.intent.slots.taskName.value;
    var listName = request.intent.slots.listName.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    createTaskOptions.qs.idList = SessionAttributes.ListIdPair[listName];
    createTaskOptions.qs.due = date;

    createTaskOptions.headers.token = SessionAttributes.LoginStatus.auth_token;
    await auth(createTaskOptions).then((response) => {
      if(response){
        speechOutput = `Task created successfully under ${listName}. What else can I help you with? `;
      }
    });

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
      .withShouldEndSession(false)
      .getResponse();

  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = `I can help you with your trello board, like fetching data or task creation etc.. 
    You can ask me for project installation guides or Build/Project status of your projects. 
    What can I help you with?` ;
    
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak(`Sorry, I didn't have information for that, but no worry, I will learn. Cause I'm Jarvis.`)
      .reprompt(`Sorry, I didn't get that.`)
      .getResponse();
  },
};

const RepeatHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.RepeatIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(`What can I help you with? `)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const getRemoteData = function (url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? require('https') : require('http');
    const request = client.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed with status code: ' + response.statusCode));
      }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(body.join('')));
    });
    request.on('error', (err) => reject(err));
  });
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequest,
    FeatureImplementation,
    BuildStatus,
    GithubInstallation,
    ProjectStatus,
    TrelloBoards,
    TrelloLists,
    StartMeeting,
    EndMeeting,
    CreateMeeting,
    ListMeeting,
    CreateTrelloTasks,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    YesIntentHandler,
    SessionEndedRequestHandler,
    RepeatHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

