'use strict';

module.exports.fulfill = function(intentRequest){
  var doc = intentRequest.currentIntent.slots.document;
  var docCate = intentRequest.currentIntent.slots.category;
  var prod = intentRequest.currentIntent.slots.product;

  return validate(docCate, prod, intentRequest.sessionAttributes);
};
