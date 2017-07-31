'use strict';

const downloadDoc = require('./downloadDoc');
const greet = require('./greet');

module.exports = function(intentRequest, callback){
  console.log(`dispatch userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);

  const intentName = intentRequest.currentIntent.name;

  if (intentName === 'DocumentDownload') {
    console.log(intentName + ' was called');
    return downloadDoc(intentRequest, callback);
  }

  if (intentName === 'GreetUser') {
    console.log(intentName + ' was called');
    return greet(intentRequest, callback);
  }
  throw new Error(`Intent with name ${intentName} not supported`);
}
