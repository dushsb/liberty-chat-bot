'use strict';

const lexResponse = require('./lexResponse');

module.exports = function(intentRequest, callback){

  const source = intentRequest.invocationSource;

  if(source === 'fulfillmentCodeHook'){
    return lexResponse.close(intentRequest.sessionAttributes, 'Fulfilled', null, null);
  }
};
