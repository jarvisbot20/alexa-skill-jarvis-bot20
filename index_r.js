const Alexa = require('ask-sdk-core');

const STREAMS = [
  {
    "token": "1",
    "url": 'https://s5.radio.co/s10444deca/listen',
    "metadata" : {
      "title": "0151 Dance Radio",
      "subtitle": "non stop music 24hrs a day",
    }
  }
];

const PlayStreamIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {

    return handlerInput.responseBuilder
      .speak(`Thank you for listening to oh one five one dance radio. To start just say Play.`)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const PlayIntent = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        (
          handlerInput.requestEnvelope.request.intent.name === 'PlayStreamIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOnIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ShuffleOnIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent'
      );
  },
  handle(handlerInput) {

    let stream = STREAMS[0];

    handlerInput.responseBuilder
      .speak(`Thank you for listening to oh one five one dance radio. To start just say Play.`)
      .addAudioPlayerPlayDirective('REPLACE_ALL', stream.url, stream.token, 0, null, stream.metadata);

    return handlerInput.responseBuilder
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
    const speechText = `Listening to oh one five one dance radio. Enjoy it. To continue listening say: resume, or say: stop to stop listening`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(false)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOffIntent' ||
          handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ShuffleOffIntent'
        );
  },
  handle(handlerInput) {

    handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ALL')
      .addAudioPlayerStopDirective();

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const PlaybackStoppedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'PlaybackController.PauseCommandIssued' || 
            handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStopped';
  },
  handle(handlerInput) {
    handlerInput.responseBuilderd
      .addAudioPlayerClearQueueDirective('CLEAR_ALL')
      .addAudioPlayerStopDirective();

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const PlaybackStartedIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'AudioPlayer.PlaybackStarted';
  },
  handle(handlerInput) {
    handlerInput.responseBuilder
      .addAudioPlayerClearQueueDirective('CLEAR_ENQUEUED');

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder
      .getResponse();
  },
};

const ExceptionEncounteredRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'System.ExceptionEncountered';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return true;
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(handlerInput.requestEnvelope.request.type);
    return handlerInput.responseBuilder
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    PlayStreamIntentHandler,
    PlayIntent,
    PlaybackStartedIntentHandler,
    CancelAndStopIntentHandler,
    PlaybackStoppedIntentHandler,
    HelpIntentHandler,
    ExceptionEncounteredRequestHandler,
    SessionEndedRequestHandler
  )
 .addErrorHandlers(ErrorHandler)
  .lambda();
 
