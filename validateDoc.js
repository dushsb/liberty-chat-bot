'use strict';

module.exports.validateDocument = function(intentRequest){
  var doc = intentRequest.currentIntent.slots.document;
  var docCate = intentRequest.currentIntent.slots.category;
  var prod = intentRequest.currentIntent.slots.product;

  return validate(doc, docCate, prod, intentRequest.sessionAttributes);
};

function validate(doc, docCate, prod, sessionAttrs){
  console.log('validation params ' + doc + ' ' + prod);

  var docId = null;
  var keyArray = null;

  var keyWords = [
      {"id":"001", "name":"", "keys":["brochure"]},
      {"id":"002", "name":"", "keys":["claims","claims form", "claim"]},
      {"id":"003", "name":"", "keys":["benefit","summery of benefit","benefit summery", "benefit schedule"]},
      {"id":"004", "name":"", "keys":["proposal","proposal form"]},
      {"id":"005", "name":"", "keys":["application","application form"]},
      {"id":"006", "name":"", "keys":["faq"]},
      {"id":"007", "name":"", "keys":["fact find form","fact","fact form"]},
      {"id":"008", "name":"", "keys":["giro form","giro"]},
      {"id":"009", "name":"", "keys":["policy wordings"]},
      {"id":"010", "name":"", "keys":["terms and conditions"]}
  ];

  if(doc){
    // validate document id in sessionAttributes
      var typedDocName = doc.toLowerCase();
      console.log('doc is not null ' + typedDocName);

      for (var i = 0; i < keyWords.length; i++) {
        keyArray = keyWords[i].keys;
        docId = keyWords[i].id;
        if (keyArray.indexOf(typedDocName) > -1) {
            break;
        }
        docId = null;
      }
      if (docId) {
        console.log("document found " + docId + " " + doc);
        // add the document id to sessionAttributes
        return buildValidationResult(true, 'document', null, docId, true, '', false);
      }else{
        console.log("document could not be found");
        return buildValidationResult(false, 'document', 'Sorry, we could not find the document. do you have any other name for this document?');
      }

  }

  return buildValidationResult(true, null, null);
};

function buildValidationResult(isValid, violatedSlot, messageContent) {
    return {
        isValid,
        violatedSlot,
        message: { contentType: 'PlainText', content: messageContent },
    };
}

function buildValidationResult(isValid, violatedSlot, messageContent, docId, isDocValid, prodId, isProdValid) {
    return {
        isValid,
        violatedSlot,
        message: { contentType: 'PlainText', content: messageContent },
        attr: { docId: docId, isDocValid: isDocValid, prodId: prodId, isProdValid:isProdValid},
    };
}
