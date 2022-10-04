const Alexa = require('ask-sdk-core');
var https = require('https');

const PlayHandler = {
	canHandle(handlerInput)
	{
		return (
			handlerInput.requestEnvelope.request.type === 'LaunchRequest' ||
			(
				handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
				handlerInput.requestEnvelope.request.intent.name === 'Play'
			) ||
			(
				handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
				(   handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent'  ||           
				    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOnIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ShuffleOnIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent'
                )
			)
		);
	},
	handle(handlerInput)
	{
	    
        var videos = require('./documents/videos.json');
        
        if (
            Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)[
                'Alexa.Presentation.APL'
            ]
        ) {
            handlerInput.responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                document: videos
            },
            {
				type: 'AudioPlayer.Play',
				playBehavior: 'REPLACE_ALL',
				audioItem:{
					stream:{
						token: '0',
						url: 'https://playoutonestreaming.com/proxy/riverradio?mp=/stream',
						offsetInMilliseconds: 0
					},
					metadata : {
                      title: "Lomond Radio",
                      subtitle: "Where Community Flows",
                      "art": {
                        "sources": [
                          {
                            "contentDescription": "Lomond Radio",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/LomondRadio.jpeg",
                            "widthPixels": 512,
                            "heightPixels": 512
                          }
                        ]
                      },
                      "backgroundImage": {
                        "sources": [
                          {
                            "contentDescription": "Lomond Radio",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/AlexaBackground.png",
                            "widthPixels": 1200,
                            "heightPixels": 800
                          }
                        ]
                      }
                    }
				},
			});
        }
        else{
            handlerInput.responseBuilder.speak(`OH Hello! <audio src = "https://radio-streams-urls.s3.eu-west-2.amazonaws.com/lomondRadio.mpeg"/>`);
            handlerInput.responseBuilder.addDirective({
				type: 'AudioPlayer.Play',
				playBehavior: 'REPLACE_ALL',
				audioItem:{
					stream:{
						token: '0',
						url: 'https://playoutonestreaming.com/proxy/riverradio?mp=/stream',
						offsetInMilliseconds: 0
					},
					metadata : {
                      title: "Lomond Radio",
                      subtitle: "Where Community Flows",
                      "art": {
                        "sources": [
                          {
                            "contentDescription": "Lomond Radio",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/LomondRadio.jpeg",
                            "widthPixels": 512,
                            "heightPixels": 512
                          }
                        ]
                      },
                      "backgroundImage": {
                        "sources": [
                          {
                            "contentDescription": "Lomond Radio",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/AlexaBackground.png",
                            "widthPixels": 1200,
                            "heightPixels": 800
                          }
                        ]
                      }
                    }
				},
			});
        }
        

    	return handlerInput.responseBuilder
//     	    .speak(`OH Hello! <audio src = "https://radio-streams-urls.s3.eu-west-2.amazonaws.com/lomondRadio.mpeg"/>`)
//     	    .addDirective({
// 				type: 'AudioPlayer.Play',
// 				playBehavior: 'REPLACE_ALL',
// 				audioItem:{
// 					stream:{
// 						token: '0',
// 						url: 'https://playoutonestreaming.com/proxy/riverradio?mp=/stream',
// 						offsetInMilliseconds: 0
// 					},
// 					metadata : {
//                       title: "Lomond Radio",
//                       subtitle: "Where Community Flows",
//                       "art": {
//                         "sources": [
//                           {
//                             "contentDescription": "Lomond Radio",
//                             "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/LomondRadio.jpeg",
//                             "widthPixels": 512,
//                             "heightPixels": 512
//                           }
//                         ]
//                       },
//                       "backgroundImage": {
//                         "sources": [
//                           {
//                             "contentDescription": "Lomond Radio",
//                             "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/AlexaBackground.png",
//                             "widthPixels": 1200,
//                             "heightPixels": 800
//                           }
//                         ]
//                       }
//                     }
// 				},
// 			})
			.getResponse();
	}
};

const PauseStopHandler = {
	canHandle(handlerInput)
	{
		return (
				handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
				(
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
				)
			) ||
			(
				handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
				handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent'
			);
	},
	handle(handlerInput)
	{
    	return handlerInput.responseBuilder
    	    .speak("Thanks for listening to lomond radio Scotland.")
			.addDirective({
				type: 'AudioPlayer.ClearQueue',
				clearBehavior: 'CLEAR_ALL'
			})
			.getResponse();
	}
};

const HelpIntentHandler = {
	canHandle(handlerInput)
	{
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput)
	{
		const speechText = `This skill plays River Radio Scotland. To continue listening say: resume, or say: stop to stop listening.`;
		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	}
};

const SessionEndedRequestHandler = {
	canHandle(handlerInput)
	{
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput)
	{
		return handlerInput.responseBuilder.getResponse();
	}
};

const IntentReflectorHandler = {
	canHandle(handlerInput)
	{
		return handlerInput.requestEnvelope.request.type === 'IntentRequest';
	},
	handle(handlerInput)
	{
		const intentName = handlerInput.requestEnvelope.request.intent.name;
		const speechText = 'NO INTENT HELP TEXT';
		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	}
};

const ErrorHandler = {
	canHandle()
	{
		return true;
	},
	handle(handlerInput, error)
	{
		const speechText = `Sorry, I could not understand what you said. Please try again.`;
		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.getResponse();
	}
};

exports.handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		PlayHandler,
		PauseStopHandler,
		HelpIntentHandler,
		SessionEndedRequestHandler,
		IntentReflectorHandler)
	.addErrorHandlers(
		ErrorHandler)
	.lambda();