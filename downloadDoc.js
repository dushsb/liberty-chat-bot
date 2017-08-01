'use strict';

const lexResponse = require('./lexResponse');
const validateDoc = require('./validateDoc');
const validateProd = require('./validateProd');

module.exports = function(intentRequest, callback){

  var doc = intentRequest.currentIntent.slots.document;
  var docCate = intentRequest.currentIntent.slots.category;
  var prod = intentRequest.currentIntent.slots.product;
  var isDocValid = false;

  console.log('params:' + doc + ' ' + docCate + ' ' + prod);

  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {

    const slots = intentRequest.currentIntent.slots;

    const sessionAttributes = intentRequest.sessionAttributes;
    console.log('isDocValid 1 ' + sessionAttributes.isDocValid);
    if(typeof sessionAttributes.isDocValid == 'undefined' || sessionAttributes.isDocValid === null || sessionAttributes.isDocValid === false){
        isDocValid = false;
    }else{
      isDocValid = true;
    }

    console.log('isDocValid ' + isDocValid);
    //console.log('results1 ' + isDocValid;
    console.log('results2 ' + (doc !== null));
    //Document validation
    if(doc !== null && isDocValid === false){

      const validationResult = validateDoc.validateDocument(intentRequest);
      console.log('Validation results '
      + 'validationResult ' + validationResult
      + 'isValid ' + validationResult.isValid
      + 'isDocValid ' + validationResult.attr.isDocValid
      + 'docId ' + validationResult.attr.docId);

      if (!validationResult.isValid) {
        console.log("validation failed");
        slots[`${validationResult.violatedSlot}`] = null;
        callback(lexResponse.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots,
          validationResult.violatedSlot,validationResult.message, null));
        return;
      }

      if (validationResult.isValid) {
        console.log("Doc validation Successed");
        intentRequest.sessionAttributes.docId = validationResult.attr.docId;
        intentRequest.sessionAttributes.isDocValid = validationResult.attr.isDocValid;
        intentRequest.sessionAttributes.prodId = null;
        intentRequest.sessionAttributes.isDocValid = false;
      }
    }
    console.log('prod ' + prod);
    console.log('sessionAttributes.isProdValid ' + sessionAttributes.isProdValid);
    //Product validation
    if(prod !== null && (!sessionAttributes.isProdValid)){

      const validationResult = validateProd.validateProduct(intentRequest);

      if (!validationResult.isValid) {
        console.log("prod validation failed");
        slots[`${validationResult.violatedSlot}`] = null;
        callback(lexResponse.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots,
          validationResult.violatedSlot,validationResult.message, null));
        return;
      }
      if (validationResult.isValid) {
        console.log("Prod validation Successed");
        intentRequest.sessionAttributes.prodId = validationResult.attr.prodId;
        intentRequest.sessionAttributes.isProdValid = validationResult.attr.isProdValid;
      }
    }

    /**if((!doc) && (!prod)){//Initialized the session valiable
      intentRequest.sessionAttributes.docId = null;
      intentRequest.sessionAttributes.isDocValid = false;
      intentRequest.sessionAttributes.prodId = null;
      intentRequest.sessionAttributes.isDocValid = false;
    }*/


    callback(lexResponse.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }

  if(source === 'FulfillmentCodeHook'){
    console.log('calling => fulfillmentCodeHook')
    const slots = intentRequest.currentIntent.slots
    const sessionAttributes = intentRequest.sessionAttributes;

    console.log('Doc id ' + sessionAttributes.docId);
    console.log('Product Id ' + sessionAttributes.prodId);

    callback(lexResponse.close(sessionAttributes, 'Fulfilled'
    , { contentType: 'PlainText',
       content: `Okay, Here is the url where you can download ${doc} for ${prod}.`
     }));

    //callback(lexResponse.close(intentRequest.sessionAttributes, 'Fulfilled', null, null));
    return;
  }
};
