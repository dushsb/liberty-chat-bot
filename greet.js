'use strict';

const lexResponse = require('./lexResponse');

module.exports = function(intentRequest, callback){
  console.log('inside the greet module');
  const source = intentRequest.invocationSource;
  const slots = intentRequest.currentIntent.slots
  const sessionAttributes = intentRequest.sessionAttributes;

  if(source === 'FulfillmentCodeHook'){
    callback(lexResponse.close(sessionAttributes, 'Fulfilled'
    , { contentType: 'PlainText',
       content: `Are you looking for somekind of document`
     }//,
        //buildResponseCard('Results', 'wait for download starts..', null, linkAddress, null)
    ));
    //return lexResponse.close(intentRequest.sessionAttributes, 'Fulfilled', null, null);
    return;
  }
};
