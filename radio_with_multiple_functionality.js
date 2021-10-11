const Alexa = require('ask-sdk-core');
var https = require('https');
var axios = require('axios');
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    host: 'smtp.ionos.co.uk',
    port: 465,
    auth: {
       user: 'alexa@radiochristmas.co.uk',
       pass: 'Kd$G!K5bqpGGWUdjX$Yn'
    }
});

var message = {
    to: 'accounts@radiochristmas.co.uk',         // List of recipients
    subject: 'Message via Alexa', // Subject line
    html: 'Message Request \nRequest Sent via Alexa Skill: Radio Christmas' // Plain text body
};

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
		const speechText = `You are now listening to Radio Christmas.`;
    	return handlerInput.responseBuilder
			.speak(speechText)
			.addDirective({
				type: 'AudioPlayer.Play',
				playBehavior: 'REPLACE_ALL',
				audioItem:{
					stream:{
						token: '0',
						url: 'https://radioxmaslive.radioca.st/stream',
						offsetInMilliseconds: 0
					},
					metadata : {
                      title: "Radio Christmas",
                      subtitle: "The World's Number One Festive Charity Radio Station",
                      "art": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/radioChristmas.png",
                            "widthPixels": 512,
                            "heightPixels": 512
                          }
                        ]
                      },
                      "backgroundImage": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/AlexaBackground.png",
                            "widthPixels": 1200,
                            "heightPixels": 800
                          }
                        ]
                      }
                    }
				},
			})
			.getResponse();
	}
};

const SpecificStream = {
	canHandle(handlerInput)
	{
		return (
			handlerInput.requestEnvelope.request.type === 'LaunchRequest' ||
			(
				handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
				handlerInput.requestEnvelope.request.intent.name === 'SpecificStream'
			)
		);
	},
	handle(handlerInput)
	{
	    
	    if(handlerInput.requestEnvelope.request.intent.slots.streamName 
	    && handlerInput.requestEnvelope.request.intent.slots.streamName.resolutions 
	    && handlerInput.requestEnvelope.request.intent.slots.streamName.resolutions.resolutionsPerAuthority[0]
	    && handlerInput.requestEnvelope.request.intent.slots.streamName.resolutions.resolutionsPerAuthority[0].values[0].value){
	        var songName = handlerInput.requestEnvelope.request.intent.slots.streamName.resolutions.resolutionsPerAuthority[0].values[0].value.name;
	        var songId = handlerInput.requestEnvelope.request.intent.slots.streamName.resolutions.resolutionsPerAuthority[0].values[0].value.id;
	    }else{
	        const speechText = `You are now listening to Radio Christmas.`;
    	return handlerInput.responseBuilder
			.speak(speechText)
			.addDirective({
				type: 'AudioPlayer.Play',
				playBehavior: 'REPLACE_ALL',
				audioItem:{
					stream:{
						token: '0',
						url: 'https://radioxmaslive.radioca.st/stream',
						offsetInMilliseconds: 0
					},
					metadata : {
                      title: "Radio Christmas",
                      subtitle: "The World's Number One Festive Charity Radio Station",
                      "art": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/radioChristmas.png",
                            "widthPixels": 512,
                            "heightPixels": 512
                          }
                        ]
                      },
                      "backgroundImage": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/AlexaBackground.png",
                            "widthPixels": 1200,
                            "heightPixels": 800
                          }
                        ]
                      }
                    }
				},
			})
			.getResponse();
	    }
	    
	    songId = songId.replace("_", " ");
	    
	    var url = `https://streaming.radiochristmas.co.uk/${songName}`;
	    
		const speechText = `You are now listening to ${songId}`;
    	return handlerInput.responseBuilder
			.speak(speechText)
			.addDirective({
				type: 'AudioPlayer.Play',
				playBehavior: 'REPLACE_ALL',
				audioItem:{
					stream:{
						token: '0',
						url: url,
						offsetInMilliseconds: 0
					},
					metadata : {
                      title: "Radio Christmas",
                      subtitle: "The World's Number One Festive Charity Radio Station",
                      "art": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/radioChristmas.png",
                            "widthPixels": 512,
                            "heightPixels": 512
                          }
                        ]
                      },
                      "backgroundImage": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/AlexaBackground.png",
                            "widthPixels": 1200,
                            "heightPixels": 800
                          }
                        ]
                      }
                    }
				},
			})
			.getResponse();
	}
};

const SongRequestHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
    && handlerInput.requestEnvelope.request.intent.name === 'SongRequest';
  },
  handle(handlerInput) {
      var speechText = `Thanks for listening to Radio Christmas, We have recieved your request.`;
      var songName = handlerInput.requestEnvelope.request.intent.slots.songName.value;
      var SessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
  
      
      var requestMessage = `<p> Song Request/Message: <p style='font-weight:bold;'>${songName}</p> </p>
      <br>
      <p> Request sent via Alexa Skill: Radio Christmas</p>`
      message.html = requestMessage;
      SessionAttributes.Message = message;
      
      transport.sendMail(message, function(err, info) {
          if (err) {
            console.log(err);
          } else {
            var lol = 'Email sent: ' + info.response;
            console.log(lol);
            SessionAttributes.RequestMessage = lol;
          }
      });
      

      return handlerInput.responseBuilder
        .speak(speechText)
        .addDirective({
				type: 'AudioPlayer.Play',
				playBehavior: 'REPLACE_ALL',
				audioItem:{
					stream:{
						token: '0',
						url: 'https://radioxmaslive.radioca.st/stream',
						offsetInMilliseconds: 0
					},
					metadata : {
                      title: "Radio Christmas",
                      subtitle: "The World's Number One Festive Charity Radio Station",
                      "art": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/radioChristmas.png",
                            "widthPixels": 512,
                            "heightPixels": 512
                          }
                        ]
                      },
                      "backgroundImage": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/AlexaBackground.png",
                            "widthPixels": 1200,
                            "heightPixels": 800
                          }
                        ]
                      }
                    }
				},
			}).getResponse();
  }
};

var config = {
    method: 'get',
    url: 'https://radiochristmas.co.uk/metaradiofeed/radio-christmas/?mode=track_now_titleartist',
    headers: { }
};

const CurrentSongIntent = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'CurrentSongIntent';
    },
    async handle(handlerInput) {
        
    var SessionAttributes = handlerInput.attributesManager.getSessionAttributes();    
    var data;
    await axios(config)
    .then(function (response) {
        data = response.data;
    })
    .catch(function (error) {
        console.log(error);
    });

    var fin  = `This is ${data}`;
    console.log(fin);

    const speechText = fin;
    
    return handlerInput.responseBuilder
        .speak(speechText)
        .addDirective({
				type: 'AudioPlayer.Play',
				playBehavior: 'REPLACE_ALL',
				audioItem:{
					stream:{
						token: '0',
						url: 'https://radioxmaslive.radioca.st/stream',
						offsetInMilliseconds: 0
					},
					metadata : {
                      title: "Radio Christmas",
                      subtitle: "The World's Number One Festive Charity Radio Station",
                      "art": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/radioChristmas.png",
                            "widthPixels": 512,
                            "heightPixels": 512
                          }
                        ]
                      },
                      "backgroundImage": {
                        "sources": [
                          {
                            "contentDescription": "Radio Christmas",
                            "url": "https://echo-backgrounds.s3.ap-south-1.amazonaws.com/AlexaBackground.png",
                            "widthPixels": 1200,
                            "heightPixels": 800
                          }
                        ]
                      }
                    }
				},
			}).getResponse();
    }
}

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
		const speechText = 'You can say Play, Stop or Resume.';
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
		CurrentSongIntent,
        SongRequestHandler,
		PauseStopHandler,
		SpecificStream,
		HelpIntentHandler,
		SessionEndedRequestHandler,
		IntentReflectorHandler)
	.addErrorHandlers(
		ErrorHandler)
	.lambda();
