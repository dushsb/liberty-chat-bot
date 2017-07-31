'use strict';

module.exports.validateProduct = function(intentRequest){
  var doc = intentRequest.currentIntent.slots.document;
  var docCate = intentRequest.currentIntent.slots.category;
  var prod = intentRequest.currentIntent.slots.product;

  return validate(docCate, prod, intentRequest.sessionAttributes);
};

function validate(docCate, prod, sessionAttrs){
  console.log('validation params ' + prod + ' ' + sessionAttrs.name + " " + sessionAttrs.attrVal);

  var prodKeyWords = [
      {"id":"001", "name":"Private Car", "keys":["Private Car"]},
      {"id":"002", "name":"Privilege - High-End Car", "keys":["Privilege - High-End Car", "High-End Car", "Privilege Car"]},
      {"id":"003", "name":"Motor Cycle", "keys":["motor cycle"]},
      {"id":"004", "name":"proMedico", "keys":["promedico"]},
      {"id":"005", "name":"proMediCare", "keys":["promediCare"]},
      {"id":"006", "name":"proMediCash", "keys":["promediCash"]},
      {"id":"007", "name":"proMedico Plus", "keys":["promedico plus"]},
      {"id":"008", "name":"MyHEALTH", "keys":["MyHEALTH","myhealth"]},
      {"id":"009", "name":"TourCare Plus", "keys":["TourCare Plus", "tourcare plus"]},
      {"id":"010", "name":"Overseas StudentCare", "keys":["overseas studentcare","osc"]}
  ];

  var productId = null;
  var keyArray = null;

  if(prodKeyWords && sessionAttrs.attrVal){
    // validate product id in sessionAttributes
      var selectedProdName = prod.toLowerCase();
      console.log('Product is not null' + selectedProdName);

      for (var i = 0; i < prodKeyWords.length; i++) {
        keyArray = prodKeyWords[i].keys;
        productId = prodKeyWords[i].id;
        if (keyArray.indexOf(selectedProdName) > -1) {
            break;
        }
        productId = null;
      }
      if (productId) {
        // add the document id to sessionAttributes
        return buildValidationResult(true, null, null, null, null, prodId, true);
      }else{
        console.log("Product could not be found");
        return buildValidationResult(false, 'product', 'Sorry, we could not find the Product. do you have any other name for this product?');
      }
      console.log("Product found " + productId + " " + prod);
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
