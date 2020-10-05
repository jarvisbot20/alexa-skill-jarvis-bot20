const Alexa = require('ask-sdk-core');
var request = require("request");

var loginOptions = { method: 'GET',
  url: 'http://3.95.154.161/jwt/create',
  headers: 
   { 'Postman-Token': 'dc8b2d26-8cc7-4581-aad1-39af6e768441',
	 'cache-control': 'no-cache' 
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
      //console.log(body);
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
    
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput = `How can I help you today? `;

    const { accessToken } = handlerInput.requestEnvelope.context.System.user;
    if (!accessToken) {
      speechOutput = 'You must authenticate with your Amazon Account to use this skill. I sent instructions for how to do this in your Alexa App';
      return handlerInput.responseBuilder
        .speak(speechOutput)
        .withLinkAccountCard()
        .getResponse();
    }
    let url = `https://api.amazon.com/user/profile?access_token=${accessToken}`;
    await getRemoteData(url)
      .then((response) => {
        const data = JSON.parse(response);
        SessionAttributes.UserData = data; 
        speechOutput = `Hi ${data.name}. How can I help you today?. `;
      })
      .catch((err) => {
        console.log(err);
        speechOutput = `Hi, How can I help you today?. `;
      });

    await auth(loginOptions).then((response) => {
      response = JSON.parse(response);
      SessionAttributes.LoginStatus = response;
    });
    console.log(SessionAttributes.LoginStatus);

    handlerInput.attributesManager.setSessionAttributes(SessionAttributes);
    SessionAttributes.Last = speechOutput;
    
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

const YesIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
  },
  async handle(handlerInput) {
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput = '';
    console.log(startOptions);
    
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
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const speechText = `What can I help you with? `;
    SessionAttributes.Last = speechText;
    
    
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
      .speak(`Sorry, I didn't have information for that. What else can I help you with?`)
      .reprompt(`Sorry, I didn't have information for that. What else can I help you with?`)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const RepeatHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && (request.intent.name === 'AMAZON.RepeatIntent');
  },
  handle(handlerInput) {
    const SessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    var speechOutput = SessionAttributes.Last;
    
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .reprompt(speechOutput)
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
    StartMeeting,
    EndMeeting,
    CreateMeeting,
    YesIntentHandler,
    ListMeeting,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    RepeatHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();