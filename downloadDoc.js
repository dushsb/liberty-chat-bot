'use strict';

const lexResponse = require('./lexResponse');
const validateDoc = require('./validateDoc');
const validateProd = require('./validateProd');

module.exports = function(intentRequest, callback){

  var doc = intentRequest.currentIntent.slots.document;
  var docCate = intentRequest.currentIntent.slots.category;
  var prod = intentRequest.currentIntent.slots.product;

  console.log('params:' + doc + ' ' + docCate + ' ' + prod);

  const source = intentRequest.invocationSource;

  if (source === 'DialogCodeHook') {

    const slots = intentRequest.currentIntent.slots;

    const sessionAttributes = intentRequest.sessionAttributes;
    console.log('sessionAttributes.isDocValid ' + sessionAttributes.isDocValid + ' ' + doc);
    console.log('results1 ' + (!sessionAttributes.isDocValid));
    console.log('results2 ' + ('null' !== doc));
    //Document validation
    if('null' !== doc && (!sessionAttributes.isDocValid)){

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
    //Product validation
    if(prod && sessionAttributes.isProdValid == false){

      const validationResult = validateProd.validateProduct(intentRequest);

      if (!validationResult.isProdValid) {
        console.log("prod validation failed");
        slots[`${validationResult.violatedSlot}`] = null;
        callback(lexResponse.elicitSlot(intentRequest.sessionAttributes, intentRequest.currentIntent.name, slots,
          validationResult.violatedSlot,validationResult.message, null));
        return;
      }
      if (validationResult.isDocValid) {
        intentRequest.sessionAttributes.prodId = validationResult.attr.prodId;
        intentRequest.sessionAttributes.isProdValid = validationResult.attr.isProdValid;
      }
    }

    if((!doc) && (!prod)){//Initialized the session valiable
      intentRequest.sessionAttributes.docId = null;
      intentRequest.sessionAttributes.isDocValid = false;
      intentRequest.sessionAttributes.prodId = null;
      intentRequest.sessionAttributes.isDocValid = false;
    }


    callback(lexResponse.delegate(intentRequest.sessionAttributes, intentRequest.currentIntent.slots));
    return;
  }

  if(source === 'fulfillmentCodeHook'){

    const slots = intentRequest.currentIntent.slots

    callback(lexResponse.close(intentRequest.sessionAttributes, 'Fulfilled', null, null));
    return;
  }
};
